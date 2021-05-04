import {Component} from 'react';
import SortableTree, {addNodeUnderParent, removeNodeAtPath, TreeItem, getNodeAtPath, changeNodeAtPath, map as mapTree, walk as walkTree, getFlatDataFromTree } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Database } from '../../../Structure/Database';
import ResponseError from '../../RepsonseError/ResponseError';

interface IProps{
  course_id: string
}
interface IState{
  treeData: TreeItem[], 
  nodeClicked: any, 
  isInput: boolean, 
  status: Number
}

export class DefineGrade extends Component<IProps, IState> {
  constructor(props:any) {
    super(props);
    console.log(this.props.course_id)

    this.state = {
      treeData: [
        { title: 'Main Grade', points: 0, children: [] },
      ],
      nodeClicked: null,
      isInput: false,
      status: 0
    };
    this.removeNode = this.removeNode.bind(this);
    this.addNode = this.addNode.bind(this);
    this.setInput = this.setInput.bind(this);
    this.updateChildrenPointsSum = this.updateChildrenPointsSum.bind(this);

  }
  onChange(treeData: TreeItem[]){
    this.setState({ treeData })
    this.updateChildrenPointsSum();

  }

  removeNode(rowInfo: { node: any; treeIndex: any; path: any; }) {
    let {node, treeIndex, path} = rowInfo;

    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path,
        getNodeKey: ({node: TreeNode, treeIndex: number}) => {
          console.log(number);
          return number;
      },
      }),
    })
    this.updateChildrenPointsSum();

}

modifyNodeTitle(event: any, rowInfo: { node: any; treeIndex: any; path: any; }) {
  let {node, treeIndex, path} = rowInfo;
  node.title = event.target.value;
  this.modifyNode(node,treeIndex,path);
}

modifyNodePoints(event: any, rowInfo: { node: any; treeIndex: any; path: any; }) {
  let {node, treeIndex, path} = rowInfo;
  node.points = Number(event.target.value);
  this.modifyNode(node,treeIndex,path);
}

modifyNode( node: any, treeIndex: any, path: any) {
  this.setState((state) => ({
    treeData: changeNodeAtPath({
      treeData: state.treeData,
      path,
      getNodeKey: ({node: TreeNode, treeIndex: number}) => {
        console.log(number);
        return number;
      },
      newNode: node
    })
  }));
  this.updateChildrenPointsSum();
}

addNode(rowInfo: { node: any; treeIndex: any; path: any; }) {
  let {node, treeIndex, path} = rowInfo;
  this.setState({
    treeData: addNodeUnderParent({
      treeData: this.state.treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey: ({node: TreeNode, treeIndex: number}) => {
        console.log(number);
        return number;
    },
      newNode: {
        title: 'Subgrade',
        points: 0,
      expanded: true,
      children: []
      },
    }).treeData,
  })
  this.updateChildrenPointsSum();
}

handleNodeClick(node: any){
  this.setState({
    nodeClicked: node,
    isInput: true,
  });
  this.updateChildrenPointsSum();

}

getNodeTitle(rowInfo: any){
  let {node, treeIndex, path} = rowInfo;
  this.updateChildrenPointsSum();

  return node.title;
}

getNodePoints(rowInfo: any){
  let {node, treeIndex, path} = rowInfo;
  this.updateChildrenPointsSum();

  return node.points.toString()
}

setInput(){
  this.setState({ isInput: false });
  this.updateChildrenPointsSum();

}


getParentKey(path: any){
  if(path.length <= 1){
    return null;
  }
  else {
    return 'grade_'+path[path.length-2];
  }
}

getFlatData(){
  this.updateChildrenPointsSum();

  var treeData = getFlatDataFromTree({
    treeData: this.state.treeData,
    getNodeKey: ({node: TreeNode, treeIndex: number}) => {
        return number;
    }
  })

  var flatTree = treeData.map(
    (e, key) => {
      {return {_id: 'grade_'+key, name: e.node.title, level: e.path.length-1, maxPoints: e.node.points, studentPoints: {}, thresholds: [], parentID:  this.getParentKey(e.path)
    }}
    }
  )

//console.log(flatTree)

Database.postCourseGradeModel(this.props.course_id, JSON.stringify(flatTree))
.then(res=>{
    this.setState({
        status: 200,
    })
}).catch(err=>{
    if(err.response){
       this.setState({status:err.reposonse.status});
    }
    else{
        this.setState({
            status: -1,
        })
    }
    
    console.log(err);
})
  console.log(flatTree)
}

updateChildrenPointsSum(){
  walkTree({
      treeData: this.state.treeData,
      getNodeKey: ({node: TreeNode, treeIndex: number}) => {
        return number;
    },
    callback: (param: { node: { title: any; points: any; children: any[]; }; }) => {if(param.node.children.length !== 0) {let sum = 0; param.node.children.forEach(e => sum+=e.points ); param.node.points=sum}}},
  )
}


  render() {
    switch (this.state.status) {
      case 200:
      return (
        <h2>You have correctly defined the grade!</h2> 
      )
      case 0:
    return (
      
      <div>
         <div style={{ height: 400 }}>
          <SortableTree
             treeData={this.state.treeData}
             onChange={treeData => this.setState({ treeData })}
             maxDepth={3}
             canDrag={false}
             generateNodeProps={rowInfo => ({
              style: {width: 1000},
               title:
               this.state.isInput && rowInfo.node === this.state.nodeClicked ? (       
                <form>
                <input
                  value={this.getNodeTitle(rowInfo)}
                  onChange={(event) => this.modifyNodeTitle(event, rowInfo)}
                  onBlur={this.setInput}
                />
              </form>
              ) : (
                rowInfo.node.title
              ),
              buttons: [
              rowInfo.node.children?.length === 0 && this.state.isInput && rowInfo.node === this.state.nodeClicked ? (
                <form>
                <input
                  value={this.getNodePoints(rowInfo)}
                  onChange={(event) => this.modifyNodePoints(event, rowInfo)}
                  onBlur={this.setInput}
                />
              </form>
              ) : (
                rowInfo.node.points.toString()
              ),
                <FontAwesomeIcon className="w3-text-green w3-margin-left w3-margin-right w3-large" onClick={(event) => this.addNode(rowInfo)} icon={faPlus} />,
                <FontAwesomeIcon className="w3-text-red w3-large" onClick={(event) => this.removeNode(rowInfo)} icon={faMinus} />
                     ],
                     onClick: () => {
                       this.handleNodeClick(rowInfo.node);
                     }
                                })}
             
        ></SortableTree>
        </div>
          <button className="w3-btn w3-hover-green w3-right w3-teal" onClick={this.getFlatData.bind(this)}>Submit</button>
        
      </div>
    );
    default:
      return (
          <ResponseError status={this.state.status} />
      );
    }
  }
}
export default DefineGrade;