
import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "import statement forbidden";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}

class NoImportsWalker extends Lint.RuleWalker {
    public visitImportDeclaration(node: ts.ImportDeclaration) {

        // create a fixer for this failure
        const fix = new Lint.Replacement(node.getStart(), node.getWidth(), "");

        // create a failure at the current position
        this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING, fix);

        // call the base version of this visitor to actually parse this node
        super.visitImportDeclaration(node);
    }
}
