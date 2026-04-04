#!/bin/bash

# Quick Course Generation Script
# Generates the remaining 40 courses with one command

echo "╔════════════════════════════════════════════════════╗"
echo "║     CodeLearner - Generate Remaining Courses       ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Define remaining 40 courses (add to generateCurricula.js first)
remaining_courses=(
    # Systems/Low-Level
    "c" "assembly" "vhdl" "verilog"
    
    # Web
    "html" "css" "sass" "less" "graphql"
    
    # Mobile
    "swift" "kotlin" "dart" "objective-c"
    
    # Functional
    "haskell" "erlang" "elixir" "fsharp" "ocaml" 
    "elm" "lisp" "scheme" "prolog"
    
    # Enterprise
    "csharp" "scala" "groovy" "visualbasic" "cobol"
    
    # Data Science
    "r" "julia" "matlab" "fortran"
    
    # Scripting
    "shell" "powershell" "perl" "lua"
    
    # Emerging
    "nim" "crystal" "apex" "solidity"
)

echo "This script will generate ${#remaining_courses[@]} courses."
echo ""
echo "⚠️  IMPORTANT: First add course definitions to generateCurricula.js"
echo ""
echo "Courses to be generated:"
for course in "${remaining_courses[@]}"; do
    echo "  • $course"
done

echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Generating courses..."
    echo ""
    
    success=0
    failed=0
    
    for course in "${remaining_courses[@]}"; do
        echo -n "Generating $course... "
        if node generateCurricula.js "$course" 2>/dev/null; then
            echo "✓"
            ((success++))
        else
            echo "✗ (definition not found - add to generateCurricula.js)"
            ((failed++))
        fi
    done
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Results:"
    echo "  Success: $success"
    echo "  Failed:  $failed"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if [ $success -gt 0 ]; then
        echo "✅ Successfully generated $success courses!"
        echo ""
        echo "Next steps:"
        echo "  1. Review generated files in src/data/courses/"
        echo "  2. Enhance with language-specific content"
        echo "  3. Add detailed examples and exercises"
        echo "  4. Test TypeScript compilation"
    fi
    
    if [ $failed -gt 0 ]; then
        echo ""
        echo "❌ $failed courses failed to generate."
        echo "Add their definitions to generateCurricula.js first."
    fi
else
    echo ""
    echo "Operation cancelled."
fi

echo ""
