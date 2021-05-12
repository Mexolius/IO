import {Component} from 'react';
import SortableTree, {TreeItem, getFlatDataFromTree, changeNodeAtPath, walk as walkTree, getTreeFromFlatData } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Database } from '../../../Structure/Database';
import ResponseError from '../../RepsonseError/ResponseError';
import { Course, Grade } from '../../../Structure/DataModel.interface';

interface IProps{
  course: Course,
  studentID: string
}
interface IState{
  treeData: TreeItem[], 
  nodeClicked: any, 
  isInput: boolean, 
  status: Number
}


export class AddGrade extends Component<IProps, IState> {
  constructor(props:any) {
    super(props);

    var treeStruct = getTreeFromFlatData({
        flatData: this.props.course.grades,
        getKey: node => node._id,
        getParentKey: node => node.parentID,
        rootKey: this.props.course.grades[0].parentID,
        });

        walkTree({
          treeData: treeStruct,
          getNodeKey: ({node: TreeNode, treeIndex: number}) => {
            return number;
        },
        callback: (param: { node: { title: any; points: any; children: any[]; expanded: boolean}; }) => {param.node.points=0; param.node.expanded=true}},
      )
        
    this.state = {
      treeData: treeStruct,
      nodeClicked: null,
      isInput: false,
      status: 0
    };
    this.setInput = this.setInput.bind(this);
    this.updateChildrenPointsSum = this.updateChildrenPointsSum.bind(this);
  }


modifyNodePoints(event: any, rowInfo: { node: any; treeIndex: any; path: any; }) {
  let {node, treeIndex, path} = rowInfo;
  if(isNaN(event.target.value) || (event.target.value == NaN) ) {
    node.points = 0;
  }
  else if(Number(event.target.value) < 0) {
    node.points = 0;
  }
  else if(Number(event.target.value) > rowInfo.node.maxPoints) {
    node.points = rowInfo.node.maxPoints;
  }
  else {
    node.points = Number(event.target.value);
  }
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


handleNodeClick(node: any){
  this.setState({
    nodeClicked: node,
    isInput: true,
  });
  this.updateChildrenPointsSum();

}

getNodePoints(rowInfo: any){
  let {node} = rowInfo;
  this.updateChildrenPointsSum();

  return node.points?.toString()
}

getNodeMaxPoints(rowInfo: any){
  let {node} = rowInfo;
  this.updateChildrenPointsSum();

  return node.maxPoints?.toString()
}

setInput(){
  this.setState({ isInput: false });
  this.updateChildrenPointsSum();

}


onSubmit(){
  this.updateChildrenPointsSum();

var treeData = getFlatDataFromTree({
  treeData: this.state.treeData,
  getNodeKey: ({node: TreeNode, treeIndex: number}) => {
      return number;
  }
})

treeData.map(
  e => { Database.postStudentPoints(this.props.course._id,e.node._id, this.props.studentID, e.node.points).then(
    res => {
      if(this.state.status === 0){
        this.setState({
          status: res.status
        })
      }
    }
  ).catch(err=>{
    if(err.response){
       this.setState({status:err.reposonse.status});
    }
    else{
        this.setState({
            status: -1,
        })
    }
    
    console.log(err);
})  }
)

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
        <h2>You added the grade!</h2> 
      )
      case 0:
    return (
      <div>
         <h2>You are grading {this.props.studentID} student</h2> 
         <div style={{ height: 400 }}>
          <SortableTree
             treeData={this.state.treeData}
             onChange={treeData => this.setState({ treeData })}
             maxDepth={3}
             canDrag={false}
             generateNodeProps={rowInfo => ({
              style: {width: 1000},
               title: rowInfo.node.name,
              buttons: [
              rowInfo.node.children?.length === 0 && this.state.isInput && rowInfo.node === this.state.nodeClicked ? (
                <form>
                <input
                  value={rowInfo.node.points}
                  onChange={(event) => this.modifyNodePoints(event, rowInfo)}
                  onBlur={this.setInput}
                />
              </form>
              ) : (
                rowInfo.node.points + '/' + rowInfo.node.maxPoints + ' points'
              ) 
                     ],
                     onClick: () => {
                       this.handleNodeClick(rowInfo.node);
                     }
                                })}
             
        ></SortableTree>
        </div>
          <button className="w3-btn w3-hover-green w3-right w3-teal" onClick={this.onSubmit.bind(this)}>Submit</button>
        
      </div>
    );
    default:
      return (
          <ResponseError status={this.state.status} />
      );
    }
  }
}
export default AddGrade;

