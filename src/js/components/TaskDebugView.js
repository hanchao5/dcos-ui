import classNames from "classnames";
import mixin from "reactjs-mixin";
import React from "react";
import {StoreMixin} from "mesosphere-shared-reactjs";

import IconDownload from "./icons/IconDownload";
import MesosLogView from "./MesosLogView";
import RequestErrorMsg from "./RequestErrorMsg";
import TaskDirectoryActions from "../events/TaskDirectoryActions";
import TaskDirectoryStore from "../stores/TaskDirectoryStore";

const LOG_VIEWS = [
  {name: "stdout", displayName: "Output"},
  {name: "stderr", displayName: "Error"}
];

const METHODS_TO_BIND = [
  "onTaskDirectoryStoreError",
  "onTaskDirectoryStoreSuccess"
];

export default class TaskDebugView extends mixin(StoreMixin) {
  constructor() {
    super();

    this.state = {
      taskDirectoryErrorCount: 0,
      currentView: 0
    };

    this.store_listeners = [{
      name: "taskDirectory",
      events: ["success", "error"],
      unmountWhen: function (store, event) {
        if (event === "success") {
          return TaskDirectoryStore.getDirectory(this.props.task) !== undefined;
        }
      }
    }];

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });

  }

  componentDidMount() {
    super.componentDidMount(...arguments);
    TaskDirectoryStore.getDirectory(this.props.task);
  }

  onTaskDirectoryStoreError() {
    this.setState({
      taskDirectoryErrorCount: this.state.taskDirectoryErrorCount + 1
    });
  }

  onTaskDirectoryStoreSuccess() {
    this.setState({directory: TaskDirectoryStore.get("directory")});
  }

  handleViewChange(index) {
    this.setState({currentView: index, directory: undefined});
  }

  hasLoadingError() {
    return this.state.taskDirectoryErrorCount >= 3;
  }

  getErrorScreen() {
    return <RequestErrorMsg />;
  }

  getLoadingScreen() {
    return (
      <div className="container container-fluid container-pod text-align-center vertical-center
        inverse">
        <div className="row">
          <div className="ball-scale">
            <div />
          </div>
        </div>
      </div>
    );
  }

  getEmtyLogScreen(logName) {
    return (
      <div className="flex-grow vertical-center">
        <h3 className="text-align-center flush-top">
          {`${logName} Log is Currently Empty`}
        </h3>
        <p className="text-align-center flush-bottom">
          Please try again later.
        </p>
      </div>
    );
  }

  getLogView(logName, filePath, nodeID) {
    let {state} = this;
    if (!state.directory) {
      return this.getLoadingScreen();
    }

    if (!filePath) {
      return this.getEmtyLogScreen(logName);
    }

    return (
      <MesosLogView
        filePath={filePath}
        slaveID={nodeID}
        logName={logName} />
    );
  }

  getSelectionButtons() {
    let currentView = this.state.currentView;

    return LOG_VIEWS.map((view, index) => {
      let classes = classNames({
        "button button-stroke": true,
        "active": index === currentView
      });

      return (
        <button
          className={classes}
          key={index}
          onClick={this.handleViewChange.bind(this, index)}>
          {view.displayName}
        </button>
      );
    });
  }

  render() {
    if (this.hasLoadingError()) {
      return this.getErrorScreen();
    }

    let {props, state} = this;
    let currentView = LOG_VIEWS[state.currentView];
    let directory = state.directory;
    let nodeID = props.task.slave_id;

    // Only try to find file if directory exists
    let directoryItem = directory && directory.findFile(currentView.name);
    // Only try to get path if file exists
    let filePath = directoryItem && directoryItem.get("path");

    return (
      <div className="flex-container-col flex-grow no-overflow">
        <div className="control-group flex-align-right">
          <div className="button-group form-group">
            {this.getSelectionButtons()}
          </div>
          <a
            className="button button-stroke"
            disabled={!filePath}
            href={TaskDirectoryActions.getDownloadURL(nodeID, filePath)}>
            <IconDownload />
          </a>
        </div>
        {this.getLogView(currentView.displayName, filePath, nodeID)}
      </div>
    );
  }
}

TaskDebugView.propTypes = {
  task: React.PropTypes.object
};

TaskDebugView.defaultProps = {
  task: {}
};
