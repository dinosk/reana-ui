/*
	-*- coding: utf-8 -*-

	This file is part of REANA.
	Copyright (C) 2018 CERN.

	REANA is free software; you can redistribute it and/or modify it under the
	terms of the GNU General Public License as published by the Free Software
	Foundation; either version 2 of the License, or (at your option) any later
	version.

	REANA is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with REANA; if not, see <http://www.gnu.org/licenses>.

	In applying this license, CERN does not waive the privileges and immunities
	granted to it by virtue of its status as an Intergovernmental Organization or
	submit itself to any jurisdiction.
*/

import React, { Component } from "react";
import history from "../../../history";
import { Button } from "semantic-ui-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class WorkflowsActions extends Component {
  static disableView() {
    return false;
  }

  static disablePause() {
    return true;
  }

  static disableResume(status) {
    return status !== "created";
  }

  static disableRunnable(status) {
    return status === "created" || status === "running";
  }

  static showDetails = (id, name, run, created, status) => () => {
    cookies.set("workflow-id", id, { path: "/" });
    cookies.set("workflow-name", name, { path: "/" });
    cookies.set("workflow-run", run, { path: "/" });
    cookies.set("workflow-created", created, { path: "/" });
    cookies.set("workflow-status", status, { path: "/" });
    history.push("/details");
  };

  render() {
    return (
      <Button.Group basic icon size="tiny" color="blue" widths="4">
        <Button
          disabled={WorkflowsActions.disableView()}
          onClick={WorkflowsActions.showDetails(
            this.props.id,
            this.props.name,
            this.props.run,
            this.props.created,
            this.props.status
          )}
          icon="eye"
          content=" View"
          compact
        />
        <Button
          disabled={WorkflowsActions.disablePause()}
          icon="pause"
          content=" Pause"
          compact
        />
        <Button
          disabled={WorkflowsActions.disableResume(this.props.status)}
          icon="play"
          content=" Resume"
        />
        <Button
          disabled={WorkflowsActions.disableRunnable(this.props.status)}
          icon="refresh"
          content=" Rerun"
        />
      </Button.Group>
    );
  }
}
