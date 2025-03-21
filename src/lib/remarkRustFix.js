// remark-rust-fix.js
export default function remarkRustFix() {
    return (tree) => {
      visit(tree, 'code', (node) => {
        if (node.lang === 'rust') {
          // Change language from rust to text
          node.lang = 'text';
        }
      });
    };
  };
  
  // Simple visit function if you don't want to install unist-util-visit
  function visit(tree, type, visitor) {
    if (tree && tree.type === type) {
      visitor(tree);
    }
    
    if (tree.children) {
      tree.children.forEach(child => visit(child, type, visitor));
    }
  }