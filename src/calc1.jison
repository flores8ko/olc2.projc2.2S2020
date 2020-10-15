/* description: Parses and executes mathematical expressions. */

// este es un importe xD



/* lexical grammar */
%lex


%s                comment



EscapeSequence                  ('\\' [btnfr"'\\])
SingleCharacter                 [^'\\]
StringCharacter                 [^"\\] | {EscapeSequence}
StringCharacters                {StringCharacter}+

JavaCharacterLiteral            ('\''{SingleCharacter}'\'')|('\''{EscapeSequence}'\'')
JavaStringLiteral               '"' {StringCharacters}? '"'



%%
"/*"                  {

                        this.begin('no joda man xD');
                        }
<comment>"*/"         {

                        this.popState();
                        }
<comment>.            /* skip comment content*/


"abstract"              return 'abstract'

"break"                 return 'break'
"boolean"               return 'boolean'

"case"                  return 'case'
"class"                 return 'class'
"char"                  return 'char'
"continue"              return 'continue'

"default"               return 'default'
"double"                return 'double'
"do"                    return 'do'

"else"                  return 'else'
"extends"               return 'extends'
"false"                 return 'false'
"final"                 return 'final'
"for"                   return 'for'

"if"                    return 'if'
"import"                return 'import'
"int"                   return 'int'

"new"                   return 'new'
"null"                  return 'NULL'

"println"               return 'println'
"print"                 return 'print'
"public"                return 'public'
"private"               return 'private'
"protected"             return 'protected'

"return"                return 'return'

"switch"                return 'switch'
"str"                   return 'str'
"static"                return 'static'
"super"                 return 'super'

"this"                  return 'this'
"throw"                 return 'throw'
"true"                  return 'true'
"toDouble"              return 'toDouble'
"toInt"                 return 'toInt'
"toChar"                return 'toChar'

"void"                  return 'void'
"while"                 return 'while'


"//".*                /* skip comments */

\s+                   /* skip whitespace */


"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'
";"                     return ';'
":"                     return ':'
"?"                     return '?'
","                     return ','

[0-9]+"."[0-9]+         return 'DOUBLE'
[0-9]+                  return 'INTEGER'
{JavaCharacterLiteral}  return 'CHAR';
{JavaStringLiteral}     return 'STRING';


"."                     return '.'


"||"                    return '||'
"&&"                    return '&&'
"^"                     return '^'
"!="                    return '!='
"!"                     return '!'

"%"                   return '%'
"*"                   return '*'
"/"                   return '/'
"--"                  return '--'
"-"                   return '-'
"++"                  return '++'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'

"=="                    return '=='
"="                     return '='

"<="                    return '<='
">="                    return '>='
"<"                     return '<'
">"                     return '>'
"@"                     return '@'
"#"                     return '#'




[a-zA-Z_][a-zA-Z0-9_]*    return 'IDENTIFIER';

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex




/* operator associations and precedence */

%right '?'
%left '||'
%left '&&'
%left '^'
%left '==' '!='
%left '<' '>' '<=' '>='
%left '+' '-'
%left '*' '/' '%'

%right UMINUS
%right 'new' UCHAR UINT UDOUBLE

%left '--' '++' '!'
%left '.' '['

%left HOPE2
%left HOPE

%start withBeenDrunk

%% /* language grammar */

withBeenDrunk
    : globalSentenceList EOF               { return $1; }
    ;

/* sentenceLists */

globalSentenceList
    : globalSentences                   { $$ = $1; }
    | %empty                            { $$ = []; }
    ;
globalSentences
    : globalSentences globalSentence    { $$ = $1; $1.push($2); }
    | globalSentence                    { $$ = [$1];}
    ;
globalSentence
    : globalClassDeclaration                { $$ = $1; }
    | nativeFuns                            { $$ = $1; }
    | importSentence ";"                    { $$ = $1; }
    ;


classSentenceList
    :                               { $$ = []; }
    | classSentences                { $$ = $1; }
    ;
classSentences
    : classSentences classSentence  { $$ = $1; $1.push($2); }
    | classSentence                 { $$ = [$1]; }
    ;
classSentence
    : classLevelVarDeclaration ';'      { $$ = $1; }
    | classLevelFunDeclaration          { $$ = $1; }
    ;


funSentenceList
    :                           { $$ = []; }
    | funSentences              { $$ = $1; }
    ;
funSentences
    : funSentences funSentence  { $$ = $1; $1.push($2); }
    | funSentence               { $$ = [$1]; }
    ;
funSentence
    : assignation ';'               { $$ = $1; }
    | funLevelVarDeclaration ';'    { $$ = $1; }
    | increment ';'                 { $$ = $1; }
    | normalInvoke ';'              { $$ = $1; }
    | dotInvoke ';'                 { $$ = $1; }
    | simplePrint ';'               { $$ = $1; }
    | whileLoop                     { $$ = $1; }
    | forLoop                       { $$ = $1; }
    | doWhileLoop                   { $$ = $1; }
    | ifControl                     { $$ = $1; }
    | switchControl                 { $$ = $1; }
    | returnControl ';'             { $$ = $1; }
    | breakControl  ';'             { $$ = $1; }
    | continueControl ';'           { $$ = $1; }
    | throwControl ';'              { $$ = $1; }
    ;

/* ********************************************************** */
/* ********************** Sentences ************************* */

importSentence
    : 'import' STRING           { $$ = new ast.ImportNode(yy.last(), @1, JSON.parse($2) ); }
    ;

globalClassDeclaration
    : 'class' IDENTIFIER classExtension '{'
         classSentenceList
      '}'                       {
                                    $$ = new ast.ClassDeclaration(yy.last(), @2, [], $2, $3, $5);
                                 }
    | globalLevelModifiers 'class' IDENTIFIER classExtension '{'
         classSentenceList
      '}'                       { $$ = new ast.ClassDeclaration(yy.last(), @3, $1, $3, $4, $6); }
    ;

classExtension
    : 'extends' IDENTIFIER      { $$ = new ast.GetNClassOperation($2); }
    |
    ;


globalLevelModifiers
    : globalLevelModifiers globalLevelModifier  { $$ = $1; $1.push($2); }
    | globalLevelModifier                       { $$ = [$1]; }
    ;
globalLevelModifier
    : 'abstract'                                { $$ = new ast.AddAbstractModifier(); }
    | 'final'                                   { $$ = new ast.AddFinalModifier();  }

    // ver si pueden venir estos
    | 'public'                                  { $$ = new ast.AddPublicModifier(); }
    | 'private'                                 { $$ = new ast.AddPrivateModifier(); }
    ;

classLevelModifiers
    : classLevelModifiers classLevelModifier    { $$ = $1; $1.push($2); }
    | classLevelModifier                        { $$ = [$1]; }
    ;
classLevelModifier
    : 'public'                                  { $$ = new ast.AddPublicModifier(); }
    | 'private'                                 { $$ = new ast.AddPrivateModifier(); }
    | 'protected'                               { $$ = new ast.AddProtectedModifier(); }
    | localLevelModifier                        { $$ = $1; }
    ;
localLevelModifier
    : 'abstract'                                { $$ = new ast.AddAbstractModifier(); }
    | 'final'                                   { $$ = new ast.AddFinalModifier();  }
    | 'static'                                  { $$ = new ast.AddStaticModifier(); }
    ;
funLevelModifier
    : 'abstract'                                { $$ = new ast.AddAbstractModifier(); }
    | 'final'                                   { $$ = new ast.AddFinalModifier();  }
    ;


classLevelVarDeclaration
    : classLevelModifiers type varDeclarations      { $$ = new ast.ClassLevelVarDeclaration(yy.last(), @2, $1, $2, $3);  }
    | type varDeclarations                          { $$ = new ast.ClassLevelVarDeclaration(yy.last(), @1, [], $1, $2);  }
    ;
funLevelVarDeclaration
    : funLevelModifier type varDeclarations         { $$ = new ast.FunLevelVarDeclaration(yy.last(), @2, $1, $2, $3); }
    | primitiveType varDeclarations                 { $$ = new ast.FunLevelVarDeclaration(yy.last(), @1, undefined, $1, $2); }
    | IDENTIFIER varDeclarations                    { $$ = new ast.FunLevelVarDeclaration(yy.last(), @1, undefined, new ast.GetNClassOperation($1), $2); }
    ;

varDeclarations
    : varDeclarations ',' varDeclaration            { $$ = $1; $$.push($3); }
    | varDeclaration                                { $$ = [$1]; }
    ;
varDeclaration
    : IDENTIFIER instanceType '=' expression        { $$ = new ast.DeclareVarNode(yy.last(), @1,  $1, $2, $4); }
    | IDENTIFIER instanceType '=' arrayLiteral      { $$ = new ast.DeclareVarNode(yy.last(), @1, $1, $2, $4); }
    | IDENTIFIER instanceType                       { $$ = new ast.DeclareVarNode(yy.last(), @1, $1, $2);  }
    ;

arrayLiteral
    : '{' arrayElementList '}'                      { $$ = new ast.CreateArrayLiteral(yy.last(), @1, $2); }
    ;

arrayElementList
    :                                               { $$ = []; }
    | arrayElements                                 { $$ = $1; }
    ;
arrayElements
    : arrayElements ',' arrayElement                { $$ = $1; $1.push($3); }
    | arrayElement                                  { $$ = [$1]; }
    ;

arrayElement
    : expression                                    { $$ = $1; } // aqui se podria desenvolver
    | arrayLiteral                                  { $$ = $1; }
    ;

instanceType
    :                                               { $$ = new ast.EmptyInstanceTypeOperation($1); }
    | arrayInstanceType                             { $$ = $1; }
    ;
arrayInstanceType
    : arrayInstanceType '[' ']'                     { $$ = new ast.ArrayInstanceTypeOperation($1); }
    | '[' ']'                                       { $$ = new ast.ArrayInstanceTypeOperation(undefined); }
    ;

classLevelFunDeclaration
    : classLevelModifiers type  IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @3, $1, $2, undefined, $3, $5, $8); }
    | type IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [], $1, undefined, $2, $4, $7); }

    | classLevelModifiers type arrayInstanceType IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @4, $1, $2, $3, $4, $6, $9); }
    | type arrayInstanceType IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @3, [], $1, $2, $3, $5, $8); }

    | classLevelModifiers IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ConstructorDeclaration(yy.last(), @2, $1, $2, $4, $7); }
    | IDENTIFIER '(' paramDeclarationList ')'
      '{' funSentenceList '}'                       { $$ = new ast.ConstructorDeclaration(yy.last(), @1, [], $1, $3, $6); }
    ;


paramDeclarationList
    : paramDeclarations                         { $$ = $1; }
    |                                           { $$ = []; }
    ;
paramDeclarations
    : paramDeclarations ',' paramDeclaration    { $$ = $1; $1.push($3); }
    | paramDeclaration                          { $$ = [$1]; }
    ;
paramDeclaration
    : 'final' type IDENTIFIER instanceType      { $$ = new ast.ParamDeclaration(yy.last(), @3, true, $2, $3, $4); }
    | type IDENTIFIER instanceType              { $$ = new ast.ParamDeclaration(yy.last(), @2, false, $1, $2, $3); }
    ;


type
    : primitiveType { $$ = $1; }
    | IDENTIFIER    { $$ = new ast.GetNClassOperation($1); }
    ;

primitiveType
    : 'int'         { $$ = new ast.GetNClassOperation($1); }
    | 'double'      { $$ = new ast.GetNClassOperation($1); }
    | 'char'        { $$ = new ast.GetNClassOperation($1); }
    | 'boolean'     { $$ = new ast.GetNClassOperation($1); }
    | 'void'        { $$ = new ast.GetNClassOperation($1); }
    ;



assignation
    : expression '=' expression     { $$ = new ast.AssignNode(yy.last(), @2, $1, $3); }
    ;

expression
    : expression '-' expression             { $$ = new ast.SubNode(yy.last(), @2, $1, $3); }                // checked
    | expression '+' expression             { $$ = new ast.AddNode(yy.last(), @2, $1, $3); }                // 50% + falta agregar llamada a String
    | expression '*' expression             { $$ = new ast.MulNode(yy.last(), @2, $1, $3); }                // checked
    | expression '/' expression             { $$ = new ast.DivNode(yy.last(), @2, $1, $3); }                // checked, falta throw
    | expression '%' expression             { $$ = new ast.ModNode(yy.last(), @2, $1, $3); }                // checked, falta throw
    | expression '!=' expression            { $$ = new ast.NotEqualsNode(yy.last(), @2, $1, $3); }          // checked
    | expression '==' expression            { $$ = new ast.EqualsNode(yy.last(), @2, $1, $3); }             // checked, falta soporte para string
    | expression '<' expression             { $$ = new ast.LessThanNode(yy.last(), @2, $1, $3); }           // checked
    | expression '>' expression             { $$ = new ast.GreaterThanNode(yy.last(), @2, $1, $3); }        // checked
    | expression '<=' expression            { $$ = new ast.LessEqualsThanNode(yy.last(), @2, $1, $3); }     // checked
    | expression '>=' expression            { $$ = new ast.GreaterEqualsThanNode(yy.last(), @2, $1, $3); }  // checked
    | expression '||' expression            { $$ = new ast.OrNode(yy.last(), @2, $1, $3); }                 // checked
    | expression '&&' expression            { $$ = new ast.AndNode(yy.last(), @2, $1, $3); }                // checked
    | expression '^' expression             { $$ = new ast.XorNode(yy.last(), @2, $1, $3); }                // checked
    | expression '.' IDENTIFIER             { $$ = new ast.DotNode(yy.last(), @2, $1, $3); }                // checked

    | dotInvoke                             { $$ = $1; }
    | normalInvoke                          { $$ = $1; }

    | STRING                                { $$ = new ast.CreateStringNode(yy.last(), @1, JSON.parse($1) ); }

    | CHAR                                  { $$ = new ast.CreateCharNode(yy.last(), @1, JSON.parse('"' + $1.slice(1, -1) + '"') ); }
    | DOUBLE                                { $$ = new ast.CreateDoubleNode(yy.last(), @1, parseFloat($1)); }
    | INTEGER                               { $$ = new ast.CreateIntegerNode(yy.last(), @1, parseInt($1)); }
    | NULL                                  { $$ = new ast.CreateNullNode(yy.last(), @1); }
    | 'true'                                { $$ = new ast.CreateTrueNode(yy.last(), @1); }
    | 'false'                               { $$ = new ast.CreateFalseNode(yy.last(), @1); }

    | IDENTIFIER                            { $$ = new ast.GetDeclaredMemberNode(yy.last(), @1, $1); }          // checked
    | 'this'                                { $$ = new ast.GetDeclaredMemberNode(yy.last(), @1, 'this'); }      // checked

    | expression '[' expression ']'         { $$ = new ast.AccessArrayElement(yy.last(), @2, $1, $3); }
    | '(' expression ')'                    { $$ = $2; }
    | '-' expression %prec UMINUS           { $$ = new ast.UMinusNode(yy.last(), @1, $2); }
    | '!' expression                        { $$ = new ast.NotNode(yy.last(), @1, $2); }
    | expression "?" expression ":" expression { $$ = new ast.TernaryNode(yy.last(), @2, $1, $3, $5); }
    | increment                             { $$ = $1; }
    | 'new' type '(' expressionList ')'     { $$ = new ast.CreateInstanceNode(yy.last(), @1, $2, $4); }
    | 'new' type fixedArrayInit             { $$ = new ast.CreateFixedArrayNode(yy.last(), @1, $2, $3[0]); }
    | casting                               { $$ = $1; }
    ;

casting
    : '(' 'int' ')' expression %prec UINT              { $$ = new ast.IntCastNode(yy.last(), @2, $4); }
    | '(' 'double' ')' expression %prec UDOUBLE           { $$ = new ast.DoubleCastNode(yy.last(), @2, $4); }
    | '(' 'char'  ')' expression %prec UCHAR            { $$ = new ast.CharCastNode(yy.last(), @2, $4); }
    ;

fixedArrayInit
    : fixedArrayInit '[' expression ']'  %prec HOPE     {   const last = new ast.HopeFixedArrayInitNode( yy.last(), @2, $3);
                                                            $1[1].setHopeFixedArrayInitNode(last);
                                                            $$ = [$1[0], last];
                                                        }
    | '[' expression ']'                    { let first = new ast.HopeFixedArrayInitNode(yy.last(), @1, $2); $$ = [first, first]; }
    ;


// separar las sentencias
normalInvoke
    : IDENTIFIER '(' expressionList ')'     { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'print' '(' expressionList ')'        { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'println' '(' expressionList ')'      { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'super' '(' expressionList ')'        { $$ = new ast.SuperFunInvoke(yy.last(), @1, $3); }
    | 'this' '(' expressionList ')'         { $$ = new ast.ThisFunInvoke(yy.last(), @1, $3); }
    | 'str' '(' expressionList ')'        { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'toDouble' '(' expressionList ')'        { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'toInt' '(' expressionList ')'        { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    | 'toChar' '(' expressionList ')'        { $$ = new ast.InnerFunInvoke(yy.last(), @1, $1, $3); }
    ;


dotInvoke
    : expression '.' IDENTIFIER '(' expressionList ')'  { $$ = new ast.DotInvokeNode(yy.last(), @2, $1, $3, $5); }
    ;

increment
    : '++' expression                       { $$ = new ast.PreIncrementNode(yy.last(), @1, $2); }
    | '--' expression                       { $$ = new ast.PreDecrementNode(yy.last(), @1, $2); }
    | expression '++'                       { $$ = new ast.PostIncrementNode(yy.last(), @2, $1); }
    | expression '--'                       { $$ = new ast.PostDecrementNode(yy.last(), @2, $1); }
    ;


expressionList
    : expressions                   { $$ = $1; }
    |                               { $$ = []; }
    ;
expressions
    : expressions ',' expression    { $$ = $1;  $$.push($3); }
    | expression                    { $$ = [$1]; }
    ;

//-----------------------------
// Control sentences

whileLoop
    : 'while' '(' expression ')' '{'
        funSentenceList
      '}'                           { $$ = new ast.WhileNode( yy.last(), @1, $3, $6); }
    ;

doWhileLoop
    : 'do' '{'
        funSentenceList
      '}' 'while' '(' expression ')'  { $$ = new ast.DoWhileNode(yy.last(), @5, $3, $7); }
    ;

forLoop
    : 'for' '(' forInit  ';' expression ';'  increment  ')' '{'
        funSentenceList
      '}'                           { $$ = new ast.ForNode(yy.last(), @1, $3, $5, $7, $10); }
    | 'for' '(' forInit  ';' expression ';'  assignation  ')' '{'
        funSentenceList
      '}'                           { $$ = new ast.ForNode(yy.last(), @1, $3, $5, $7, $10); }
    ;

forInit
    : assignation             { $$ = $1; }
    | funLevelVarDeclaration  { $$ = $1; }
    ;



switchControl
    : 'switch' '(' expression  ')'   '{'
        cases
        'default' ':' funSentenceList
    '}'                                     { $$ = new ast.SwitchNode(yy.last(), @1, $3, $6, $9);  }
    | 'switch' '(' expression  ')'   '{'
              cases
       '}'                                     { $$ = new ast.SwitchNode(yy.last(), @1, $3, $6, []);  }
    | 'switch' '(' expression  ')'   '{'

           '}'                                     { $$ = new ast.SwitchNode(yy.last(), @1, $3, [], []);  }
    ;

cases
    : cases caseBlock           { $$ = $1; $1.push($2); }
    | caseBlock                 { $$ = [$1]; }
    ;

caseBlock
    : 'case' expression ':' funSentenceList         { $$ = new ast.CaseNode.ts(yy.last(), @1, $2, $4); }
    ;


ifControl
    : 'if' '(' expression ')' ifBody                    { $$ = new ast.IfNode(yy.last(), @1, $3, $5, []); }
    | 'if' '(' expression ')' ifBody 'else' ifBody      { $$ = new ast.IfNode(yy.last(), @1, $3, $5, $7); }
    | 'if' '(' expression ')' ifBody 'else' ifControl   { $$ = new ast.IfNode(yy.last(), @1, $3, $5, [$7]); }
    ;

ifBody
    : '{' funSentenceList '}'       { $$ = $2; }
    ;


returnControl
    : 'return' expression   { $$ = new ast.ReturnNode(yy.last(), @1, $2); }
    | 'return'              { $$ = new ast.ReturnNode(yy.last(), @1, undefined); }
    ;

breakControl
    : 'break'               { $$ = new ast.BreakNode(yy.last(), @1); }
    ;

continueControl
    : 'continue'            { $$ = new ast.ContinueNode(yy.last(), @1); }
    ;

throwControl
    : 'throw' expression    { $$ = new ast.ThrowNode(yy.last(), @1, $2); }
    ;

//*************************************************************************************************

nativeFuns
    : '@' type 'println' '(' paramDeclarationList ')'
      '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type 'print' '(' paramDeclarationList ')'
      '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type 'str' '(' paramDeclarationList ')'
       '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type 'toDouble' '(' paramDeclarationList ')'
           '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type 'toInt' '(' paramDeclarationList ')'
           '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type 'toChar' '(' paramDeclarationList ')'
           '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    | '@' type IDENTIFIER '(' paramDeclarationList ')'
           '{' funSentenceList '}'               { $$ = new ast.ClassLevelFunDeclaration(yy.last(), @2, [new ast.AddStaticModifier()], $2, undefined, $3, $5, $8); }
    ;


simplePrint
    : '#' 'print' '(' IDENTIFIER ',' expression ')'        { $$ = new ast.SimplePrintNode(yy.last(), @2, $4, $6); }
    ;
