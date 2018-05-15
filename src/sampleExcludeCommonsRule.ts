import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

const FAILURE_STRING = 'commons library is deprecated';

export class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata = {
        ruleName: 'sample-exclude-commons',
        description: `exclude commons library`,
        rationale: '',
        options: null,
        optionsDescription: '',
        type: 'style',
        typescriptOnly: true
    };
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

const COMMONS_IMPORTS = '@atlas/commons';

function walk(ctx: Lint.WalkContext<void>) {

    for (const statement of ctx.sourceFile.statements) {
        if (!tsutils.isImportDeclaration(statement)) {
            continue;
        }
        if (!statement.importClause) {
            continue;
        }
        if (!statement.importClause.namedBindings) {
            continue;
        }
        if (!tsutils.isNamedImports(statement.importClause.namedBindings)) {
            continue;
        }
        if (!tsutils.isLiteralExpression(statement.moduleSpecifier)) {
            continue;
        }
        const moduleSpecifier = statement.moduleSpecifier.text;
        if (moduleSpecifier.startsWith(COMMONS_IMPORTS)) {
            const fix = Lint.Replacement.deleteFromTo(statement.getStart(), statement.getEnd());
            ctx.addFailureAtNode(statement, FAILURE_STRING, fix);
            continue;
        }

    }
}
