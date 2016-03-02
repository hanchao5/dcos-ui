import {Form} from 'reactjs-components';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/

import _ACLGroupStore from '../stores/ACLGroupStore';
import _GroupUserMembershipTab from './GroupUserMembershipTab';
import _PermissionsView from '../../acl/components/PermissionsView';

import MesosSummaryStore from '../../../../../src/js/stores/MesosSummaryStore';

const EXTERNAL_CHANGE_EVENTS = [
  'onAclStoreGroupGrantSuccess',
  'onAclStoreGroupRevokeSuccess',
  'onGroupStoreAddUserSuccess',
  'onGroupStoreDeleteUserSuccess'
];

const METHODS_TO_BIND = ['handleNameChange'];

module.exports = (PluginSDK) => {

  let {RequestErrorMsg, SidePanelContents, StringUtil} = PluginSDK.get([
    'RequestErrorMsg', 'SidePanelContents', 'StringUtil']);

  let ACLGroupStore = _ACLGroupStore(PluginSDK);
  let GroupUserMembershipTab = _GroupUserMembershipTab(PluginSDK);
  let PermissionsView = _PermissionsView(PluginSDK);

  class GroupSidePanelContents extends SidePanelContents {
    constructor() {
      super();

      this.tabs_tabs = {
        permissions: 'Permissions',
        members: 'Members'
      };

      this.state = {
        currentTab: Object.keys(this.tabs_tabs).shift(),
        fetchedDetailsError: false
      };

      this.store_listeners = [
        {
          name: 'acl',
          events: [
            'groupGrantSuccess',
            'groupRevokeSuccess'
          ]
        },
        {
          name: 'group',
          events: [
            'addUserSuccess',
            'deleteUserSuccess',
            'fetchedDetailsSuccess',
            'fetchedDetailsError'
          ]
        },
        {
          name: 'summary',
          events: ['success'],
          listenAlways: false
        }
      ];

      EXTERNAL_CHANGE_EVENTS.forEach((event) => {
        this[event] = this.onACLChange;
      });

      METHODS_TO_BIND.forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }

    componentDidMount() {
      super.componentDidMount();

      ACLGroupStore.fetchGroupWithDetails(this.props.itemID);
    }

    handleNameChange(model) {
      ACLGroupStore.updateGroup(
        this.props.itemID,
        {description: model.description}
      );
    }

    onACLChange() {
      ACLGroupStore.fetchGroupWithDetails(this.props.itemID);
    }

    onGroupStoreFetchedDetailsSuccess() {
      if (this.state.fetchedDetailsError) {
        this.setState({fetchedDetailsError: false});
      }
    }

    onGroupStoreFetchedDetailsError(groupID) {
      if (groupID === this.props.itemID) {
        this.setState({fetchedDetailsError: true});
      }
    }

    getErrorNotice() {
      return (
        <div className="container container-pod">
          <RequestErrorMsg />
        </div>
      );
    }

    getGroupInfo(group) {
      let editNameFormDefinition = [
        {
          fieldType: 'text',
          name: 'description',
          placeholder: 'Group Name',
          required: true,
          sharedClass: 'form-element-inline h1 flush',
          showError: false,
          showLabel: false,
          writeType: 'edit',
          validation: function () { return true; },
          value: group.description
        }
      ];

      let imageTag = (
        <div className="side-panel-icon icon icon-large icon-image-container icon-group-container">
          <img src="./img/layout/icon-group-default-64x64@2x.png" />
        </div>
      );

      return (
        <div className="side-panel-content-header-details flex-box
          flex-box-align-vertical-center">
          {imageTag}
          <div className="side-panel-content-header-label">
            <Form definition={editNameFormDefinition}
              formRowClass="row"
              formGroupClass="form-group flush-bottom"
              onSubmit={this.handleNameChange} />
            <div>
              {this.getSubHeader(group)}
            </div>
          </div>
        </div>
      );
    }

    getSubHeader(group) {
      let userCount = group.getUserCount();
      let serviceCount = group.getPermissionCount();
      let userLabel = StringUtil.pluralize('Member', userCount);
      let serviceLabel = StringUtil.pluralize('Service', serviceCount);

      return (
        <div>
          {`${serviceCount} ${serviceLabel}, ${userCount} ${userLabel}`}
        </div>
      );
    }

    renderPermissionsTabView(group) {
      return (
        <div className="
          side-panel-tab-content
          side-panel-section
          container
          container-fluid
          container-pod
          container-pod-short
          container-fluid
          flex-container-col
          flex-grow">
          <PermissionsView
            permissions={group.getPermissions()}
            itemID={this.props.itemID}
            itemType="group" />
        </div>
      );
    }

    renderMembersTabView() {
      return (
        <GroupUserMembershipTab groupID={this.props.itemID} />
      );
    }

    render() {
      let group = ACLGroupStore.getGroup(this.props.itemID);

      if (this.state.fetchedDetailsError) {
        return this.getErrorNotice();
      }

      if (group.get('gid') == null ||
          !MesosSummaryStore.get('statesProcessed')) {
        return this.getLoadingScreen();
      }

      return (
        <div className="flex-container-col">
          <div className="container container-fluid container-pod
            container-pod-divider-bottom container-pod-divider-bottom-align-right
            container-pod-divider-inverse container-pod-short-top
            side-panel-content-header side-panel-section flush-bottom">
            {this.getGroupInfo(group)}
            <ul className="tabs tall list-inline flush-bottom">
              {this.tabs_getUnroutedTabs()}
            </ul>
          </div>
          {this.tabs_getTabView(group)}
        </div>
      );
    }
  }
  return GroupSidePanelContents;
};
