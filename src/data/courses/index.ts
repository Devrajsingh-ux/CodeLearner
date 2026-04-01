/**
 * Course Curriculum Index
 * Central export for all course curricula
 */

export * from './types';

// Course imports - will be populated as curricula are generated
export { pythonCurriculum } from './Python/curriculum';
export { javascriptCurriculum } from './JavaScript/curriculum';
export { typescriptCurriculum } from './TypeScript/curriculum';
export { htmlCurriculum } from './HTML/curriculum';
export { cssCurriculum } from './CSS/curriculum';
export { sassCurriculum } from './SASS/curriculum';
export { lessCurriculum } from './LESS/curriculum';
export { cCurriculum } from './C/curriculum';
export { cppCurriculum } from './C++/curriculum';
export { csharpCurriculum } from './C#/curriculum';
export { javaCurriculum } from './Java/curriculum';
export { goCurriculum } from './Go/curriculum';
export { rustCurriculum } from './Rust/curriculum';
export { rubyCurriculum } from './Ruby/curriculum';
export { phpCurriculum } from './PHP/curriculum';
export { swiftCurriculum } from './Swift/curriculum';
export { kotlinCurriculum } from './Kotlin/curriculum';
export { dartCurriculum } from './Dart/curriculum';
export { objectiveCCurriculum } from './Objective-C/curriculum';
export { haskellCurriculum } from './Haskell/curriculum';
export { erlangCurriculum } from './Erlang/curriculum';
export { elixirCurriculum } from './Elixir/curriculum';
export { fsharpCurriculum } from './F#/curriculum';
export { ocamlCurriculum } from './OCaml/curriculum';
export { elmCurriculum } from './Elm/curriculum';
export { lispCurriculum } from './Lisp/curriculum';
export { schemeCurriculum } from './Scheme/curriculum';
export { prologCurriculum } from './Prolog/curriculum';
export { scalaCurriculum } from './Scala/curriculum';
export { groovyCurriculum } from './Groovy/curriculum';
export { cobolCurriculum } from './COBOL/curriculum';
export { visualbasicCurriculum } from './VisualBasic/curriculum';
export { rCurriculum } from './R/curriculum';
export { juliaCurriculum } from './Julia/curriculum';
export { matlabCurriculum } from './MATLAB/curriculum';
export { fortranCurriculum } from './Fortran/curriculum';
export { shellCurriculum } from './Shell/curriculum';
export { powershellCurriculum } from './PowerShell/curriculum';
export { perlCurriculum } from './Perl/curriculum';
export { luaCurriculum } from './Lua/curriculum';
export { sqlCurriculum } from './SQL/curriculum';
export { graphqlCurriculum } from './GraphQL/curriculum';
export { solidityCurriculum } from './Solidity/curriculum';
export { nimCurriculum } from './Nim/curriculum';
export { crystalCurriculum } from './Crystal/curriculum';
export { apexCurriculum } from './Apex/curriculum';
export { assemblyCurriculum } from './Assembly/curriculum';
export { vhdlCurriculum } from './VHDL/curriculum';
export { verilogCurriculum } from './Verilog/curriculum';

// Course registry for dynamic access
import type { Curriculum } from './types';

export const courseRegistry: Record<string, () => Promise<Curriculum>> = {
  'python': () => import('./Python/curriculum').then(m => m.pythonCurriculum),
  'javascript': () => import('./JavaScript/curriculum').then(m => m.javascriptCurriculum),
  'typescript': () => import('./TypeScript/curriculum').then(m => m.typescriptCurriculum),
  'html': () => import('./HTML/curriculum').then(m => m.htmlCurriculum),
  'css': () => import('./CSS/curriculum').then(m => m.cssCurriculum),
  'sass': () => import('./SASS/curriculum').then(m => m.sassCurriculum),
  'less': () => import('./LESS/curriculum').then(m => m.lessCurriculum),
  'c': () => import('./C/curriculum').then(m => m.cCurriculum),
  'cpp': () => import('./C++/curriculum').then(m => m.cppCurriculum),
  'csharp': () => import('./C#/curriculum').then(m => m.csharpCurriculum),
  'java': () => import('./Java/curriculum').then(m => m.javaCurriculum),
  'go': () => import('./Go/curriculum').then(m => m.goCurriculum),
  'rust': () => import('./Rust/curriculum').then(m => m.rustCurriculum),
  'ruby': () => import('./Ruby/curriculum').then(m => m.rubyCurriculum),
  'php': () => import('./PHP/curriculum').then(m => m.phpCurriculum),
  'swift': () => import('./Swift/curriculum').then(m => m.swiftCurriculum),
  'kotlin': () => import('./Kotlin/curriculum').then(m => m.kotlinCurriculum),
  'dart': () => import('./Dart/curriculum').then(m => m.dartCurriculum),
  'objective-c': () => import('./Objective-C/curriculum').then(m => m.objectiveCCurriculum),
  'haskell': () => import('./Haskell/curriculum').then(m => m.haskellCurriculum),
  'erlang': () => import('./Erlang/curriculum').then(m => m.erlangCurriculum),
  'elixir': () => import('./Elixir/curriculum').then(m => m.elixirCurriculum),
  'fsharp': () => import('./F#/curriculum').then(m => m.fsharpCurriculum),
  'ocaml': () => import('./OCaml/curriculum').then(m => m.ocamlCurriculum),
  'elm': () => import('./Elm/curriculum').then(m => m.elmCurriculum),
  'lisp': () => import('./Lisp/curriculum').then(m => m.lispCurriculum),
  'scheme': () => import('./Scheme/curriculum').then(m => m.schemeCurriculum),
  'prolog': () => import('./Prolog/curriculum').then(m => m.prologCurriculum),
  'scala': () => import('./Scala/curriculum').then(m => m.scalaCurriculum),
  'groovy': () => import('./Groovy/curriculum').then(m => m.groovyCurriculum),
  'cobol': () => import('./COBOL/curriculum').then(m => m.cobolCurriculum),
  'visualbasic': () => import('./VisualBasic/curriculum').then(m => m.visualbasicCurriculum),
  'r': () => import('./R/curriculum').then(m => m.rCurriculum),
  'julia': () => import('./Julia/curriculum').then(m => m.juliaCurriculum),
  'matlab': () => import('./MATLAB/curriculum').then(m => m.matlabCurriculum),
  'fortran': () => import('./Fortran/curriculum').then(m => m.fortranCurriculum),
  'shell': () => import('./Shell/curriculum').then(m => m.shellCurriculum),
  'powershell': () => import('./PowerShell/curriculum').then(m => m.powershellCurriculum),
  'perl': () => import('./Perl/curriculum').then(m => m.perlCurriculum),
  'lua': () => import('./Lua/curriculum').then(m => m.luaCurriculum),
  'sql': () => import('./SQL/curriculum').then(m => m.sqlCurriculum),
  'graphql': () => import('./GraphQL/curriculum').then(m => m.graphqlCurriculum),
  'solidity': () => import('./Solidity/curriculum').then(m => m.solidityCurriculum),
  'nim': () => import('./Nim/curriculum').then(m => m.nimCurriculum),
  'crystal': () => import('./Crystal/curriculum').then(m => m.crystalCurriculum),
  'apex': () => import('./Apex/curriculum').then(m => m.apexCurriculum),
  'assembly': () => import('./Assembly/curriculum').then(m => m.assemblyCurriculum),
  'vhdl': () => import('./VHDL/curriculum').then(m => m.vhdlCurriculum),
  'verilog': () => import('./Verilog/curriculum').then(m => m.verilogCurriculum),
};

export const getAllCourseSlugs = (): string[] => Object.keys(courseRegistry);

export const getCurriculum = async (slug: string): Promise<Curriculum | null> => {
  const loader = courseRegistry[slug.toLowerCase()];
  if (!loader) return null;
  return loader();
};
