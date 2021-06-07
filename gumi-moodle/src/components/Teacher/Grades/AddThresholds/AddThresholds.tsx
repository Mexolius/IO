import {Component} from 'react';
import SortableTree, {TreeItem, getFlatDataFromTree, changeNodeAtPath, walk as walkTree, getTreeFromFlatData } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Database } from '../../../../Structure/Database';
import ResponseError from '../../../../Structure/ResponseError';
import { Course, Grade } from '../../../../Structure/DataModel.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const trackStyle = [{ background: "orange" }, { background: "yellow" }, { background: "lightgreen" }, { background: "seagreen" }];
const handleStyle = [{ backgroundColor: 'red', borderColor: 'firebrick' }, { backgroundColor: 'orange', borderColor: 'coral' }, { backgroundColor: 'yellow', borderColor: 'gold' }, { backgroundColor: 'lightgreen', borderColor: 'darkseagreen' }, { backgroundColor: 'seagreen', borderColor: 'darkslategrey' }];

interface IProps{
  course: Course,
  choosenGradeModelID : string
}
interface IState{
  treeData: TreeItem[], 
  nodeClicked: any, 
  isInput: boolean, 
  status: Number,
}


export class AddThresholds extends Component<IProps, IState> {
  constructor(props: IProps) {
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
      getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
        return number;
      },
      callback: (param: { node: { title: any; thresholds: number[]; children: any[]; expanded: boolean }; }) => { param.node.thresholds = [50, 61, 71, 81, 91]; param.node.expanded = true }
    })

    let treeData: TreeItem[] = [];
    treeStruct.forEach(e => { if (e._id === this.props.choosenGradeModelID) treeData.push(e) });
    this.state = {
      treeData: treeData,
      nodeClicked: null,
      isInput: false,
      status: 0,
    };

    this.setInput = this.setInput.bind(this);
  }

  modifyNodeThresholds(event: any, rowInfo: { node: any; treeIndex: any; path: any; }) {
    let { node, treeIndex, path } = rowInfo;
   
    node.thresholds = event;
    console.log(node.thresholds);
    this.modifyNode(node, treeIndex, path);
  }

 getRailStyle(rowInfo: { node: any; treeIndex: any; path: any; }) {
    let { node } = rowInfo;
    return 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) ' + String(node.thresholds[4]-1) +'%, rgba(0,100,0,1) ' + String(node.thresholds[4]) + '%';
  }


  getGradeIndex(grades: Grade[], id: string): number {
    return grades.findIndex(e => e._id === id);
  }

  modifyNode(node: any, treeIndex: any, path: any) {
    this.setState((state) => ({
      treeData: changeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
          console.log(number);
          return number;
        },
        newNode: node
      })
    }));
  }


  handleNodeClick(node: any) {
    this.setState({
      nodeClicked: node,
      isInput: true,
    });

  }

  setInput() {
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
        return {
          _id: e.node._id,
          name: e.node.name,
          level: e.node.level,
          maxPoints: e.node.maxPoints,
          aggregation:e.node.aggregation,
          studentPoints: e.node.studentPoints,
          thresholds: e.node.thresholds,
          parentID: e.node.parentID,
          isLeaf: e.node.isLeaf
      }
    }
  )

    flatTree.forEach(e => {
        Database.updateCourseGradeModel(this.props.course._id, e._id, JSON.stringify(e)).then(
          res => {
            if (this.state.status === 0) {
              this.setState({
                status: res.status
              })
            }
          }
        ).catch(err => {
          if (err.response) {
            this.setState({ status: err.reposonse.status });
          }
          else {
            this.setState({
              status: -1,
            })
          }

          console.log(err);
        })
      })
  }

  render() {
    switch (this.state.status) {
      case 200:
      return (
        <div className="w3-panel w3-round-large w3-border w3-green">
          <h3>Success!</h3>
          <p>You changed grade's thresholds!</p>
        </div>
      )

      case 0:
    return (
      <div>
         <h4 className="w3-border-bottom w3-border-dark-gray w3-text-dark-gray w3-margin-bottom">You are changing <b>{this.props.choosenGradeModelID}</b> thresholds</h4>
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
                  this.state.isInput && rowInfo.node === this.state.nodeClicked 
                  ? (
                    <div style={{ width: 900}}>
                      <Range className="w3-left" 
                             allowCross={false} 
                             defaultValue={rowInfo.node.thresholds} 
                             min={0} 
                             max={100} 
                             onChange={(event) => this.modifyNodeThresholds(event, rowInfo)} 
                             railStyle={{ background: this.getRailStyle(rowInfo)}}
                             trackStyle={trackStyle}
                             handleStyle={handleStyle}
                             />
                    </div>
                  ) 
                  : (
                  <button type="button"  onClick={this.setInput} style={{backgroundColor: "#5d99c6"}} className="w3-button w3-text-white w3-round-large w3-hover-blue">
                    <FontAwesomeIcon className="w3-text-white w3-margin-left w3-margin-right w3-large"  icon={faPlus} />
                    Add Thresholds
                  </button>
                  )],
                onClick: () => this.handleNodeClick(rowInfo.node)
              })} />
        </div>
        <button style={{backgroundColor: "#5d99c6"}} className="w3-btn w3-hover-blue w3-right w3-text-white" onClick={this.onSubmit.bind(this)}>Submit</button>
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

