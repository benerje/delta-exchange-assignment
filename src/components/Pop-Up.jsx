import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Table-component.css'

class PopUp extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name:'',
         company:'',
         status:'',
         notes:''
      }
    }

    handleName = (e) => {
       this.setState({
           name:e.target.value
       })
    }

    handleCompany = (e) => {
        this.setState({
            company:e.target.value
        })
     }

     handleStatus = (e) => {
        this.setState({
            status:e.target.value
        })
     }

     handleNotes = (e) => {
        this.setState({
            notes:e.target.value
        })
     }

     handleSave = () => {
        this.props.handleAddMember(
            {
                id:Date.now(),
                Name: this.state.name,
                Company: this.state.company,
                Status: this.state.status,
                LastUpdated: moment(Date.now()).format('DD/MM/YYYY'),
                Notes:this.state.notes
            }
        )
        this.setState({
            name:'',
            company:'',
            status:'',
            notes:'',
        })
        this.props.handleChange();
     }
 
  render() {
    return (
        <div id="myModal" className="modal" style={{display:this.props.openModel?'block':'none'}} >
        <div className="modal-content">
          <span className="close" onClick={this.props.handleChange}>&times;</span>
          <h3>Add members</h3>
          <label for="fname">Name</label>
            <input type="text" value={this.state.name} onChange={this.handleName} id="fname" name="firstname" placeholder="Name" />

            <label for="lname">Company</label>
            <input type="text" value={this.state.company} onChange={this.handleCompany} id="lname" name="lastname" placeholder="Company"/>

            <label for="fname">Status</label>
            <input type="text" value={this.state.status} onChange={this.handleStatus} id="fname" name="firstname" placeholder="Status" />

            <label for="lname">Notes</label>
            <input type="text" value={this.state.notes} onChange={this.handleNotes} id="lname" name="lastname" placeholder="Notes"/>
            <div className='button-container'>
                <span onClick={this.props.handleChange} className="cancel-button">Cancel</span>
                <span onClick={this.handleSave} className="save-button">Save</span>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		openModel: state.MemberReducer.openModel
	}
}

export default connect(mapStateToProps)(PopUp);