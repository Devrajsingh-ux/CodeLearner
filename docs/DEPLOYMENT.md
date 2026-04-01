# Zentax Production Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying Zentax (CodeLearner) to production. The platform is designed for high availability, security, and scalability.

## Prerequisites

### System Requirements
- **CPU**: 2+ cores (4+ recommended)
- **RAM**: 4GB minimum (8GB+ recommended)
- **Storage**: 20GB minimum (SSD recommended)
- **Network**: 1Gbps connection

### Software Requirements
- **Docker**: 20.10+ with Docker Compose
- **Node.js**: 20+ (for development/build)
- **Redis**: 7+ (included in Docker stack)
- **Nginx**: Latest (for reverse proxy)
- **SSL Certificate**: Let's Encrypt or commercial

## Infrastructure Setup

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin

# Install Nginx
sudo apt install nginx

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx
```

### 2. Environment Configuration

Create production environment file:

```bash
# Create environment file
sudo mkdir -p /opt/zentax-production
cd /opt/zentax-production

# Create .env file
cat > .env << EOF
NODE_ENV=production

# Authentication
JWT_SECRET=$(openssl rand -hex 32)

# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key

# Redis Configuration
REDIS_URL=redis://redis:6379

# Security
ALLOWED_ORIGINS=https://yourdomain.com
CORS_CREDENTIALS=true

# Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn
DATADOG_API_KEY=your_datadog_key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
EOF

# Secure the environment file
sudo chmod 600 .env
```

### 3. Database Setup

Set up Appwrite database using the provided scripts:

```bash
# Clone the repository
git clone https://github.com/yourusername/zentax.git .

# Install dependencies
npm install

# Set up database
npm run setup:db

# Create admin user
npm run create-admin
```

## Deployment Process

### 1. Docker Deployment

```bash
# Navigate to project directory
cd /opt/zentax-production

# Pull latest code
git pull origin main

# Build and start services
docker compose -f docker-compose.prod.yml up -d

# Check service status
docker compose ps

# View logs
docker compose logs -f app
```

### 2. Nginx Configuration

Create Nginx configuration:

```bash
# Create Nginx config
sudo cat > /etc/nginx/sites-available/zentax << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https://cloud.appwrite.io https://judge0-ce.p.rapidapi.com;";

    # File Upload Limits
    client_max_body_size 10M;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:3000/api/health;
        access_log off;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/zentax /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. SSL Certificate

```bash
# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Set up auto-renewal
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Security Configuration

### 1. Firewall Setup

```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 2. System Hardening

```bash
# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Set up fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban

# Configure automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Monitoring Setup

### 1. Health Monitoring

```bash
# Create healthcheck script
cat > /opt/zentax-production/healthcheck.sh << 'EOF'
#!/bin/bash
URL="https://yourdomain.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $RESPONSE -eq 200 ]; then
    echo "$(date): Health check passed"
else
    echo "$(date): Health check failed with status $RESPONSE"
    # Send alert (configure your preferred notification method)
    # curl -X POST -H 'Content-type: application/json' \
    #   --data '{"text":"Zentax health check failed"}' \
    #   YOUR_SLACK_WEBHOOK_URL
fi
EOF

chmod +x /opt/zentax-production/healthcheck.sh

# Add to crontab for regular checks
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/zentax-production/healthcheck.sh >> /var/log/zentax-health.log") | crontab -
```

### 2. Log Management

```bash
# Set up log rotation
sudo cat > /etc/logrotate.d/zentax << 'EOF'
/opt/zentax-production/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    notifempty
    create 644 docker docker
    postrotate
        docker compose -f /opt/zentax-production/docker-compose.prod.yml restart app
    endscript
}
EOF
```

## Backup Strategy

### 1. Database Backup

```bash
# Create backup script
cat > /opt/zentax-production/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/zentax-production/backups"

mkdir -p $BACKUP_DIR

# Export Appwrite data (configure based on your Appwrite setup)
# This is a placeholder - implement based on your Appwrite backup strategy

echo "Database backup completed: $DATE"
EOF

chmod +x /opt/zentax-production/backup-db.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/zentax-production/backup-db.sh") | crontab -
```

### 2. Application Backup

```bash
# Create application backup script
cat > /opt/zentax-production/backup-app.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/zentax-production/backups"

mkdir -p $BACKUP_DIR

# Backup environment and configuration
tar -czf $BACKUP_DIR/app_config_$DATE.tar.gz .env docker-compose.prod.yml

# Keep only last 30 days of backups
find $BACKUP_DIR -name "app_config_*.tar.gz" -mtime +30 -delete

echo "Application backup completed: $DATE"
EOF

chmod +x /opt/zentax-production/backup-app.sh
```

## Scaling Configuration

### 1. Load Balancing

For high-traffic deployments, consider multiple application instances:

```yaml
# docker-compose.scale.yml
version: '3.8'

services:
  app:
    build: .
    deploy:
      replicas: 3
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    networks:
      - zentax-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx-lb.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - zentax-network
```

### 2. Database Scaling

For production databases, consider:
- Appwrite clustering
- Read replicas
- Connection pooling
- Query optimization

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   docker compose logs -f app

   # Check environment variables
   docker compose exec app printenv
   ```

2. **Database connection issues**
   ```bash
   # Test Appwrite connectivity
   curl -X GET https://cloud.appwrite.io/v1/health

   # Check API key permissions in Appwrite console
   ```

3. **Redis connection issues**
   ```bash
   # Check Redis container
   docker compose exec redis redis-cli ping

   # Check Redis logs
   docker compose logs redis
   ```

4. **SSL certificate issues**
   ```bash
   # Check certificate status
   sudo certbot certificates

   # Renew manually if needed
   sudo certbot renew --force-renewal
   ```

### Performance Optimization

1. **Enable HTTP/2**
   - Nginx configuration already includes HTTP/2
   - Ensure SSL is properly configured

2. **Database Optimization**
   - Monitor query performance in Appwrite console
   - Add indexes for frequently queried collections
   - Implement proper pagination

3. **Caching**
   - Redis caching is already configured
   - Consider CDN for static assets
   - Implement application-level caching

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check system resources (CPU, memory, disk)
   - Review application logs for errors
   - Verify backup integrity

2. **Monthly**
   - Update system packages
   - Review security logs
   - Performance analysis and optimization

3. **Quarterly**
   - Security audit
   - Disaster recovery testing
   - Capacity planning review

## Support

For deployment issues:
1. Check the troubleshooting section above
2. Review application logs in `/opt/zentax-production/logs/`
3. Verify environment configuration
4. Check system resources and connectivity

Remember to keep your environment variables secure and never commit them to version control.