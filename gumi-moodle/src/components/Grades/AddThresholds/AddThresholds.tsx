import {Component} from 'react';
import SortableTree, {TreeItem, getFlatDataFromTree, changeNodeAtPath, walk as walkTree, getTreeFromFlatData } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Database } from '../../../Structure/Database';
import ResponseError from '../../RepsonseError/ResponseError';
import { Course, Grade } from '../../../Structure/DataModel.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


interface IProps{
  course: Course,
  choosenGradeModelID : string
}
interface IState{
  treeData: TreeItem[], 
  nodeClicked: any, 
  isInput: boolean, 
  status: Number,
  thresHolds: string[]
}


export class AddThresholds extends Component<IProps, IState> {
  constructor(props:any) {
    super(props);
    var treeStruct = getTreeFromFlatData({
        flatData: this.props.course.grades,
        getKey: node => node._id,
        getParentKey: node => node.parentID,
        rootKey: this.props.course.grades[0].parentID,
        });
        console.log(this.props.course)

        walkTree({
          treeData: treeStruct,
          getNodeKey: ({node: TreeNode, treeIndex: number}) => {
            return number;
        },
        callback: (param: { node: { title: any; thresholds: any[]; children: any[]; expanded: boolean}; }) => {param.node.thresholds=[0,0,0,0,0]; param.node.expanded=true}},
      )
      console.log(treeStruct)
        console.log(this.props.choosenGradeModelID)
      let treeData: TreeItem[] = [];
        treeStruct.forEach(e =>{ if(e._id === this.props.choosenGradeModelID) treeData.push(e) });
    this.state = {
      treeData: treeData,
      nodeClicked: null,
      isInput: false,
      status: 0,
      thresHolds: ['dst', 'dst+', 'db', 'db+', 'bdb']
    };

    this.setInput = this.setInput.bind(this);
  }

  getMin(rowInfo: { node: any; treeIndex: any; path: any; }, index: number) {
    let {node, treeIndex, path} = rowInfo;
    if(index > 0) {
      return Number(node.thresholds[index-1])/100;
    }
    else {
      return 0;
    }
  }

  getMax(rowInfo: { node: any; treeIndex: any; path: any; }, index: number) {
    let {node, treeIndex, path} = rowInfo;
    if(index < 4) {
      return Number(node.thresholds[index+1])/100;
    }
    else {
      return 1;
    }
  }

modifyNodeThresholds(event: any, rowInfo: { node: any; treeIndex: any; path: any; }, index: number) {
  let {node, treeIndex, path} = rowInfo;
  var flag = true;
  for(let i:number = 0; i < index; i++){
    if(i!== index && node.thresholds[i] > Number(event.target.value) ){
      flag = false;
    }
  }

  for(let i:number = index + 1; i < 5; i++){
    if(i !== index && node.thresholds[i] < Number(event.target.value) ){
      flag = false;
    }
  }
  if(flag){
    node.thresholds[index] = Number(100*event.target.value);
  }
  else {
    if(index - 1 >= 0){
          node.thresholds[index] = 100*node.thresholds[index-1]
    }
    else {
      node.thresholds[index] = 0;
    }
  }
  console.log(node);
  this.modifyNode(node,treeIndex,path);
}


getGradeIndex(grades: Grade[], id: string): number {
  return grades.findIndex(e => e._id === id);
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
}


handleNodeClick(node: any){
  this.setState({
    nodeClicked: node,
    isInput: true,
  });

}


setInput(){
  this.setState({ isInput: false });

}


onSubmit(){
  var treeData = getFlatDataFromTree({
    treeData: this.state.treeData,
    getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
      return number;
    }
  })

console.log(treeData)

var flatTree = treeData.map(
  (e) => {
    {return {_id: e.node._id, name: e.node.name, level: e.node.level, maxPoints: e.node.maxPoints, aggregation:e.node.aggregation, studentPoints: e.node.studentPoints, thresholds: e.node.thresholds, parentID: e.node.parentID, isLeaf: e.node.isLeaf
  }}
  }
)
console.log(flatTree)

flatTree.map(
  e => { Database.updateCourseGradeModel(this.props.course._id,e._id, JSON.stringify(e) ).then(
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



  render() {
    switch (this.state.status) {
      case 200:
      return (
        <h2>You changed grade's thresholds!</h2> 
      )
      case 0:
    return (
      <div>
         <h2>You are changing {this.props.choosenGradeModelID} thresholds.</h2> 
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
                this.state.isInput && rowInfo.node === this.state.nodeClicked ? (
                  <div className="w3-large"> 
                    {this.state.thresHolds.map( (item, index) =>
                      <input className="w3-larg w3-margin" onChange={(event) => this.modifyNodeThresholds(event, rowInfo, index)} type="number" step="0.1" min="0" max="1" placeholder={item} />
                    
                    )}
                                          </div>
                   ) : (
                <button type="button"  onClick={this.setInput} className="w3-button w3-round-large w3-blue w3-hover-teal">
                    <FontAwesomeIcon className="w3-text-white w3-margin-left w3-margin-right w3-large"  icon={faPlus} />
                   Add Thresholds
            </button>
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
export default AddThresholds;

