import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { OPEN_MODEL } from '../store/store';
import PopUp from './Pop-Up';
import './Table-component.css'

class TabelComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        memberArray : [
            {
                id:Date.now(),
                Name: "Wayne Rooney",
                Company: "DC United",
                Status: "Active",
                LastUpdated:"07/07/2017",
                Notes:"ManUtd Highest scorer"
            },
            {
                id:Date.now()+2,
                Name: "Ryan Giggs",
                Company: "Manchester United",
                Status: "Closed",
                LastUpdated:"03/08/2011",
                Notes:"Most matches played"
            },
            {
                id:Date.now()+3,
                Name: "Zlatan Ibrahimovic",
                Company: "LA Galaxy",
                Status: "Active",
                LastUpdated:"03/09/2018",
                Notes:"I am ZLATAN"
            },
        ],
        sortedArr:[],
        openCompanyDropDown: false,
        openStatusDropDown: false,
      }
    }

    handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
          let tempUser = this.state.memberArray.map((user) => {
            return { ...user, isChecked: checked };
          });
          this.setState({memberArray:tempUser});
        } else {
          let tempUser = this.state.memberArray.map((user) =>
            user.Name === name ? { ...user, isChecked: checked } : user
          );
          this.setState({memberArray:tempUser});
        }
      };

      handleCompany = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
          let tempUser = this.state.memberArray.map((user) => {
            return { ...user, isCompanyChecked: checked };
          });
          this.setState({memberArray:tempUser});
          this.setState({sortedArr:[]});
        } else {
          let tempUser = this.state.memberArray.map((user) =>
            user.Name === name ? { ...user, isCompanyChecked: checked } : user
          );
          let arr = tempUser.filter((user)=>{
            return  user.isCompanyChecked === true
          })
          this.setState({sortedArr:arr});
          this.setState({memberArray:tempUser});
        }
      }

      handleStatus = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
          let tempUser = this.state.memberArray.map((user) => {
            return { ...user, isStatusChecked: checked };
          });
          this.setState({memberArray:tempUser});
          this.setState({sortedArr:[]});

        } else {
          let tempUser = this.state.memberArray.map((user) =>
            user.Name === name ? { ...user, isStatusChecked: checked } : user
          );
          let arr = tempUser.filter((user)=>{
            return  user.isStatusChecked === true
          })
          this.setState({sortedArr:arr});
          this.setState({memberArray:tempUser});
        }
      }
    onAddMemberClickHandler = () => {
        this.props.dispatch({
            type: OPEN_MODEL,
            data:!this.props.openModel
        })
    }

    handleAddMember = (member) => {
        const membArr = [...this.state.memberArray, member]
        this.setState({
            memberArray:membArr
        })
    }
    deleteHandler = (item) => {
       console.log(item)
       const delArr = this.state.memberArray.filter((mem)=>mem.id !== item.id)
       console.log(delArr);
       this.setState({
        memberArray:delArr
    })
    }

    onDropDownClick = () => {
        this.setState({
            openCompanyDropDown:!this.state.openCompanyDropDown
        })
    }

    onStatusDropDownClick = () => {
        this.setState({
            openStatusDropDown:!this.state.openStatusDropDown
        })
    }
  render() {
    return (
      <div className="table-container">
          <div className='Header'>
            <h1>Team Members</h1>
            <div className="Add-members" onClick={this.onAddMemberClickHandler}>Add Members +</div>
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            </Link>
          </div>
          <form>
              <div style={{display:'flex'}}>
  <div className="multiselect">
    <div className="selectBox" onClick={this.onDropDownClick}>
      <select>
        <option>company {this.state.sortedArr.length > 0 &&  `(${this.state.sortedArr.length})`}</option>
      </select>
      <div className="overSelect"></div>
    </div>
    <div id="checkboxes" style={{display:this.state.openCompanyDropDown?"block":'none'}}>
               <label for="one">
               <input checked={!this.state.memberArray.some((user) => user?.isCompanyChecked !== true)} name="allSelect" onChange={this.handleCompany} type="checkbox" id="one" />Select All</label>
        
        { this.state.memberArray.map((member)=>(
               <label for="two">
               <input  checked={member?.isCompanyChecked || false} onChange={this.handleCompany} name={member?.Name} type="checkbox" id="two" />{member.Company}</label>
        ))
        }
      
    
    </div>
  </div>

  <div className="multiselect">
    <div className="selectBox" onClick={this.onStatusDropDownClick}>
      <select>
        <option>Status {this.state.sortedArr.length > 0 && `(${this.state.sortedArr.length})`}</option>
      </select>
      <div className="overSelect"></div>
    </div>
    <div id="checkboxes" style={{display:this.state.openStatusDropDown?"block":'none'}}>
               <label for="one">
               <input checked={!this.state.memberArray.some((user) => user?.isStatusChecked !== true)} name="allSelect" onChange={this.handleStatus} type="checkbox" id="one" />Select All</label>
        { this.state.memberArray.map((member)=>(
               <label for="one">
               <input  checked={member?.isStatusChecked || false} onChange={this.handleStatus} name={member?.Name} type="checkbox" id="one" />{member.Status}</label>
        ))
        }
      
    
    </div>
  </div>
  </div>
</form>
        <table>
            <tr>
                <th>
                <input
                type="checkbox"
                className="form-check-input"
                name="allSelect"
                checked={!this.state.memberArray.some((user) => user?.isChecked !== true)}
                onChange={this.handleChange}
                />
                </th>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Notes</th>
                <th>Action</th>
            </tr>
           { (this.state.sortedArr.length > 0 ? this.state.sortedArr: this.state.memberArray).map(table => (
            <tr>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={table.Name}
                    checked={table?.isChecked || false}
                    onChange={this.handleChange}
                />
                </td>
                <td>{table.Name}</td>
                <td>{table.Company}</td>
                <td>{table.Status}</td>
                <td>{table.LastUpdated}</td>
                <td>{table.Notes}</td>
                <td>
               <div style={{cursor:'pointer'}} onClick={() => this.deleteHandler(table)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </div>
                </td>
            </tr>
            ))}
        </table>

        <PopUp handleAddMember={this.handleAddMember} handleChange={this.onAddMemberClickHandler}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		openModel: state.MemberReducer.openModel
	}
}

export default connect(mapStateToProps)(TabelComponent);