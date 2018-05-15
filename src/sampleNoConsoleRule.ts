
import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Usage of console are forbidden";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoConsoleWalker(sourceFile, this.getOptions()));
    }
}

class NoConsoleWalker extends Lint.RuleWalker {
    public visitExpressionStatement(node: ts.ExpressionStatement) {

        if (node.getText().indexOf("console") > -1) {

            // create a failure at the current position
            this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
        }

        // call the base version of this visitor to actually parse this node
        super.visitExpressionStatement(node);
    }
}
