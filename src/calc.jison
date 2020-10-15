/* lexical grammar */
%lex
%s                comment



EscapeSequence                  ('\\' [btnfr"'\\])
StringCharacter                 [^"\\^'\\] | {EscapeSequence}
StringCharacters                {StringCharacter}+

JavaStringLiteral               ('"' {StringCharacters}? '"') | ('\'' {StringCharacters}? '\'')



%%
"/*"                  {

                        this.begin('comment');
                        }
<comment>"*/"         {

                        this.popState();
                        }
<comment>.            /* skip comment content*/

"null"                return 'NULL';
"undefined"           return 'UNDEFINED';
"false"               return 'FALSE';
"true"                return 'TRUE';

'number'              return 'NUMBER_TYPE';
'string'              return 'STRING_TYPE';
'boolean'             return 'BOOLEAN_TYPE';
'any'                 return 'ANY_TYPE';
//'Array'               return 'ARRAY_TYPE';
'void'                return 'VOID_TYPE';

"const"               return 'CONST';
"let"                 return 'LET';
"type"                return 'TYPE';

"break"               return 'break';
"continue"            return 'continue';

"console.log"         return 'console.log';

"if"                  return 'if';
"else"                return 'else';

"while"               return 'while';
"do"                  return 'do';

"switch"              return 'switch'
"case"                return 'case'
"default"             return 'default'

"for"                 return 'for'
"in"                  return 'in'
"of"                  return 'of'

"function"            return 'function'
"return"              return 'return'

"//".*                /*skip comments*/
\s+                   /* skip whitespace */

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
{JavaStringLiteral}   return 'STRING';

"+="                  return '+='
"-="                  return '-='
"*="                  return '*='
"/="                  return '/='
"%="                  return '%='
"++"                  return '++'
"--"                  return '--'
"**"                  return '**'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"%"                   return '%'
"("                   return '('
")"                   return ')'
";"                   return ';'
","                   return ','
":"                   return ':'
"=="                  return '=='
"!="                  return '!='
"="                   return '='
">="                  return '>='
"<="                  return '<='
">"                   return '>'
"<"                   return '<'
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"?"                   return '?'
"."                   return '.'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"<"                   return '<'
">"                   return '>'

[a-zA-Z_][a-zA-Z0-9_]*    return 'IDENTIFIER';

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%left '+=' '-=' '*=' '/=' '%=' '='
%right '?'
%left '||'
%left '&&'
%left '==' '!='
%left '<' '>' '<=' '>='
%left '+' '-'
%left '*' '/' '%'
%left '**'
%right UMINUS
%right '--' '++' '!'
%left '.' '['

%start expressions

%% /* language grammar */

expressions
    : sentences EOF
        {return $1;}
    ;

sentences
    : sentences sentence { $1.push($2); $$ = $1; }
    | sentence { $$ = [$1];}
    ;

sentence
    : consoleLog ';' {$$ = $1;}
    | breakControl ';' { $$ = $1; }
    | continueControl ';' { $$ = $1; }
    | returnSentence ';' { $$ = $1; }
    | ifControl { $$ = $1; }
    | whileControl { $$ = $1; }
    | doWhileControl { $$ = $1; }
    | switchControl { $$ = $1; }
    | forControl {$$ = $1;}
    | newFunction { $$ = $1; }
    | letDeclarations ';' { $$ = $1; }
    | typeDeclaration ';' { $$ = $1; }
    | asigna ';' { $$ = $1; }
    | e ';' { $$ = $1; }
    ;

returnSentence
    : 'return' { $$ = new ast.ReturnNode(@1, null); }
    | 'return' e { $$ = new ast.ReturnNode(@2, $2); }
    ;

increment
    : e '+=' e { $$ = new ast.ReAsignAddNode(@2, $1, $3); }
    | e '-=' e { $$ = new ast.ReAsignSubNode(@2, $1, $3); }
    | e '*=' e { $$ = new ast.ReAsignMulNode(@2, $1, $3); }
    | e '/=' e { $$ = new ast.ReAsignDivNode(@2, $1, $3); }
    | e '%=' e { $$ = new ast.ReAsignModNode(@2, $1, $3); }
    | e '++' { $$ = new ast.ReAddNode(@1, $1); }
    | e '--' { $$ = new ast.ReSubNode(@1, $1); }
    ;


varType
    : NUMBER_TYPE { $$ = $1; }
    | STRING_TYPE { $$ = $1; }
    | BOOLEAN_TYPE { $$ = $1; }
    | ANY_TYPE { $$ = $1; }
    | VOID_TYPE { $$ = $1; }
    | IDENTIFIER { $$ = $1; }
 //   | ARRAY_TYPE '<' varType '>' { $$ = $1; }
    ;

corchetes
    : corchetes '[' ']'
    | '[' ']'
    ;

typeDeclaration
    : TYPE IDENTIFIER '=' '{' typeDeclarationProps '}' { $$ = new ast.DeclareTypeStructureNode(@1, $2, $5); }
    ;

typeDeclarationProps
    : typeDeclarationProps ',' typeDeclarationPropsT
        {   $$ = $1;
            $$.addEntry($3[0], $3[1]);  }
    | typeDeclarationPropsT
        {   $$ = new ast.MyMap();
            $$.addEntry($1[0], $1[1]);  }
    ;

typeDeclarationPropsT
    : IDENTIFIER ':' varType { $$ = [$1, $3]; }
    | IDENTIFIER ':' varType corchetes { $$ = [$1, 'ARRAY']; }
    ;

letDeclarations
    : LET idList ':' varType '=' e {$$ = new ast.DeclareVarListNode(@1, $4, $2, $6); }
    | LET idList ':' varType { $$ = new ast.DeclareVarListNode(@1, $4, $2);  }
    | LET idList '=' e { $$ = new ast.DeclareVarListNode(@1, "", $2, $4); }
    | LET idList {$$ = new ast.DeclareVarListNode(@1, "", $2); }
    | CONST IDENTIFIER ':' varType '=' e {$$ = new ast.DeclareVarListNode(@1, $4, [new ast.DeclareVarNode(@1, $2)], $6, true); }
    | CONST IDENTIFIER '=' e { $$ = new ast.DeclareVarListNode(@1, "", [new ast.DeclareVarNode(@1, $2)], $4, true); }
    | LET idList ':' varType corchetes '=' e {$$ = new ast.DeclareVarListNode(@1, 'ARRAY', $2, $7); }
    | LET idList ':' varType corchetes { $$ = new ast.DeclareVarListNode(@1, 'ARRAY', $2);  }
    | CONST IDENTIFIER ':' varType corchetes '=' e {$$ = new ast.DeclareVarListNode(@1, 'ARRAY', [new ast.DeclareVarNode(@1, $2)], $7, true); }
    | CONST IDENTIFIER corchetes '=' e { $$ = new ast.DeclareVarListNode(@1, "ARRAY", [new ast.DeclareVarNode(@1, $2)], $5, true); }
    ;

idList
    : idList ',' IDENTIFIER { $1.push(new ast.DeclareVarNode(@3, $3)); $$ = $1; }
    | idList ',' IDENTIFIER '=' e { $1.push(new ast.DeclareVarNode(@3, $3, $5)); $$ = $1; }
    | IDENTIFIER { $$ = [new ast.DeclareVarNode(@1, $1)] }
    | IDENTIFIER '=' e { $$ = [new ast.DeclareVarNode(@1, $1, $3)] }
    ;

asigna
    : e '=' e { $$ = new ast.AsignNode(@1, $1, $3); }
    ;

consoleLog
    : 'console.log' '(' eList ')' { $$ = new ast.ConsoleLogNode(@1, $3); }
    ;

breakControl
    : 'break' { $$ = new ast.BreakNode(); }
    ;

continueControl
    : 'continue' { $$ = new ast.ContinueNode(); }
    ;

whileControl
    : 'while' '(' e ')' ifBody { $$ = new ast.WhileNode(@1, $3, $5); }
    ;

doWhileControl
    : 'do' ifBody 'while' '(' e ')' { $$ = new ast.DoWhileNode(@1, $5, $2); }
    | 'do' ifBody 'while' '(' e ')' ';' { $$ = new ast.DoWhileNode(@1, $5, $2); }
    ;

ifControl
    : 'if' '(' e ')' ifBody { $$ = new ast.IfNode(@1, $3, $5, []); }
    | 'if' '(' e ')' ifBody 'else' ifBody { $$ = new ast.IfNode(@1, $3, $5, $7); }
    | 'if' '(' e ')' ifBody 'else' ifControl { $$ = new ast.IfNode(@1, $3, $5, [$7]); }
    ;

ifBody
    : '{' sentences '}'  { $$ = $2; }
    | sentence {$$ = [$1];}
    | '{' '}' {$$ = [];}
    ;

forControl
    : forInControl {$$ = $1;}
    | forOfControl {$$ = $1;}
    | forZControl { $$ = $1; }
    ;

forInControl
    : 'for' '(' IDENTIFIER 'in' e ')' ifBody { $$ = new ast.ForInNode(@1, $3, false, $5, $7); }
    | 'for' '(' 'LET' IDENTIFIER 'in' e ')' ifBody { $$ = new ast.ForInNode(@1, $4, true, $6, $8); }
    ;

forOfControl
    : 'for' '(' IDENTIFIER 'of' e ')' ifBody { $$ = new ast.ForOfNode(@1, $3, false, $5, $7); }
    | 'for' '(' 'LET' IDENTIFIER 'of' e ')' ifBody { $$ = new ast.ForOfNode(@1, $4, true, $6, $8); }
    ;

forZControl
    : 'for' '(' forDeclare ';' e ';' forOperator ')' ifBody { $$ = new ast.ForNode(@1, $3, $5, $7, $9); }
    ;

forDeclare
    : asigna { $$ = $1; }
    | letDeclarations { $$ = $1; }
    ;

forOperator
    : e { $$ = $1; }
    | asigna { $$ = $1; }
    ;

switchControl
    : 'switch' '(' e ')' '{' casesControl '}' { $$ = new ast.SwitchNode(@1, $3, $6); }
    ;

casesControl
    : casesControl caseControl { $1.push($2); $$ = $1; }
    | caseControl { $$ = [$1] }
    ;

caseControl
    : 'case' e ':' sentences { $$ = new ast.CaseNode(@1, $2, $4); }
    | 'default' ':' sentences { $$ = new ast.CaseNode(@1, null, $3); }
    | 'case' e ':' { $$ = new ast.CaseNode(@1, $2, []); }
    | 'default' ':' { $$ = new ast.CaseNode(@1, null, []); }
    ;

e
    : e '+' e
        {$$ = new ast.SumNode(@2, $1,$3);}
    | e '-' e
        {$$ = new ast.SubNode(@2, $1, $3);}
    | e '**' e
        {$$ = new ast.ExpNode(@2, $1, $3);}
    | e '*' e
        {$$ = new ast.MulNode(@2, $1,$3);}
    | e '/' e
        {$$ = new ast.DivNode(@2, $1,$3);}
    | e '%' e
        {$$ = new ast.ModNode(@2, $1,$3);}
    | e '==' e
        {$$ = new ast.EqNode(@2, $1, $3);}
    | e '!=' e
        {$$ = new ast.DifNode(@2, $1, $3);}
    | e '>' e
        {$$ = new ast.HigherNode(@2, $1, $3);}
    | e '>=' e
        {$$ = new ast.HigherEqNode(@2, $1, $3);}
    | e '<=' e
        {$$ = new ast.MinorEqNode(@2, $1, $3);}
    | e '<' e
        {$$ = new ast.MinorNode(@2, $1, $3);}
    | e '||' e
        {$$ = new ast.OrNode(@2, $1, $3);}
    | e '&&' e
        {$$ = new ast.AndNode(@2, $1, $3);}
    | '!' e
        {$$ = new ast.NotNode(@2, $2);}
    | '(' e ')'
        {$$ = $2;}
    | '[' ']'
        { $$ = new ast.CreateArrayNode(@1, []); }
    | '[' eList ']'
        { $$ = new ast.CreateArrayNode(@2, $2); }
    | e '[' e ']'
        { $$ = new ast.CreateArrVarNode(@1, $1, $3); }
    | '{' newObject '}'
        { $$ = new ast.CreateObjNode(@2, $2.getMap()); }
    | e '?' e ':' e
        { $$ = new ast.SentenceTernaryNode(@1, $1, $3, $5); }
    | e '.' IDENTIFIER '(' ')'
        { $$ = new ast.CreateObjFunNode(@1, $1, $3, []); }
    | e '.' IDENTIFIER '(' eList ')'
        { $$ = new ast.CreateObjFunNode(@1, $1, $3, $5); }
    | e '.' IDENTIFIER
        { $$ = new ast.CreateObjVarNode(@1, $1, $3); }
    | functionCall
        { $$ = $1; }
    | '-' e %prec UMINUS
        {$$ = new ast.MulNode(@2, $2, new ast.NumberNode(@1, -1));}
    | increment
        { $$ = $1 }
    | NUMBER
        {$$ = new ast.NumberNode(@1, Number(yytext));}
    | STRING
        {$$ = new ast.StringNode(@1, yytext); }
    | NULL
        { $$ = new ast.NullNode(); }
    | UNDEFINED
        { $$ = new ast.UndefinedNode(); }
    | FALSE
        {$$ = new ast.BooleanNode(@1, false);}
    | TRUE
        {$$ = new ast.BooleanNode(@1, true);}
    | IDENTIFIER
        { $$ = new ast.CreateIdVarNode(@1, $1); }
    ;

eList
    : eList ',' e
        {$1.push($3); $$ = $1; }
    | e
        {$$ = [$1]}
    ;

newObject
    : newObject ',' IDENTIFIER ':' e {
        $$ = $1;
        $$.addEntry($3, $5);
    }
    | IDENTIFIER ':' e {
        $$ = new ast.MyMap();
        $$.addEntry($1, $3);
     }
     ;

newFunction
    : 'function' IDENTIFIER '(' ')' '{' sentences '}'
        { $$ = new ast.DeclareFunNode(@2, $2, [], $6); }
    | 'function' IDENTIFIER '(' newFunctionParams ')' '{' sentences '}'
        { $$ = new ast.DeclareFunNode(@2, $2, $4, $7); }
    | 'function' IDENTIFIER '(' ')' ':' varType '{' sentences '}'
        { $$ = new ast.DeclareFunNode(@2, $2, [], $8, $6); }
    | 'function' IDENTIFIER '(' newFunctionParams ')' ':' varType '{' sentences '}'
        { $$ = new ast.DeclareFunNode(@2, $2, $4, $9, $7); }
    ;

newFunctionParams
    : newFunctionParams ',' newFunctionParam { $1.push($3); $$ = $1; }
    | newFunctionParam { $$ = [$1]; }
    ;

newFunctionParam
    : IDENTIFIER
        { $$ = new ast.DeclareFunParamNode(@1, $1); }
    | IDENTIFIER ':' varType
        { $$ = new ast.DeclareFunParamNode(@1, $1, $3); }
    | IDENTIFIER ':' varType corchetes
            { $$ = new ast.DeclareFunParamNode(@1, $1, 'ARRAY'); }
    ;

functionCall
    : e '(' eList ')' { $$ = new ast.FunctionCallNode(@1, $1, $3); }
    | e '(' ')' { $$ = new ast.FunctionCallNode(@1, $1, []); }
    ;
