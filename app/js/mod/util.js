class util {
    flattenData (modules){
        for (let i=0;i<modules.length;i++) {
            let children = modules[i].children
            if (children && children.length) {
                [].push.apply(modules, children)
                delete modules[i].children
            }
        }
        return modules
    }

    flattenSolutions (arr){
        return arr.map((solution)=> {
            if (!solution.modules) {
                solution.modules = []
            }
            this.flattenData(solution.modules)
            return solution
        })
    }

    tierData (arr){
        let root =  {}
        function findChildren(node){
            for (let i=0; i< arr.length;i++) {
                if (!arr[i].parent_id || arr[i].parent_id == node.id) { 
                    if (!node.children) node.children = [] 
                    node.children.push(arr[i])
                    arr.splice(i, 1)
                    i--
                }
            }
            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    findChildren(node.children[i])
                }
            }
        }
        findChildren(root)    
        return root
    }
}

export default new util