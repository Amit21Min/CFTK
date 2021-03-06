import React, { useEffect, useState }  from 'react';
import {Button, Dialog, Checkbox, AppBar, Toolbar, IconButton, Typography, Slide, TextField, Paper, MenuItem,Menu, ButtonGroup} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Card, CardActions, CardContent} from '@material-ui/core';
//import { AddIcon, CloseIcon, EditIcon, DeleteIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon,MessageIcon,MailOutlineIcon}  from '@material-ui/icons';
import {DialogActions, DialogContent, DialogTitle, Switch, FormGroup, FormControlLabel, Grid, DialogContentText} from '@material-ui/core';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Collapse,TableFooter} from '@material-ui/core';
// import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MessageIcon from '@material-ui/icons/Message';
import SpeakerNotesOffOutlinedIcon from '@material-ui/icons/SpeakerNotesOffOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Searchbar from 'material-ui-search-bar';
import db from '../../FirebaseComponents/Firebase/firebase.js';
import { database } from 'firebase';
import AlertSnackbar from '../../ReusableComponents/AlertSnackbar';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {FullScreenDialog} from '../VolunteersPanel/newgroup';

import "./index.css";
import { FormatColorResetRounded, GroupSharp } from '@material-ui/icons';
//////////////////////////////////////////////////////////////////////////////////////////////////////////




export function CardHolders() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [usersInGroup, setUsersInGroup] = React.useState([]);
  const [usersNotInGroup, setUsersNotInGroup] = React.useState([]);
  const [groupAssigned,setGroupAssigned] = React.useState([]);


  

  useEffect(() => {
    db.collection('Groups').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const group=doc.data();
        group.id=doc.id;
        if (group.users.length>0){
          setData(prevState=> [...prevState,group]);
          setUsersInGroup(prevState=> [...prevState,group.users]);
          if (group.assignment==null){
            setGroupAssigned(prevState=>[...prevState,group]);

          }
        }
        
       
        
        //const result = group.users.every(val => users.includes(val));
        //setUsersNotInGroup(pre)
        //setIdList(prevState=> [...prevState,doc.id]);
      })
      
    })
    .catch(function (error) {
        console.log("error: ", error);
    })

    db.collection('User').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const user=doc.data();
        user.id=doc.id;
        setUsers(prevState=> [...prevState,user]);
        if (usersInGroup.includes(user.id)){
          setUsersNotInGroup(prevState=>[...prevState,user]);
        }
        //setIdList(prevState=> [...prevState,doc.id]);
      })
      
    })
    .catch(function (error) {
        console.log("error: ", error);
    })

    

    

  }, []);

  return (
    <Grid container spacing={1} alignItems="flex-end" style={{display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'}}>
      <Grid item xs={3} mx='auto' my='auto'>
        <Card style={{backgroundColor:'#7CC9AA', 'width': '257px',
    'height': '136px',
    'borderRadius': '25px',
    'boxShadow' : '5px 15px 25px #b0b0b0'}}>
          <CardContent>
            <Typography variant="h2"> {data.length} </Typography>
            <Typography variant="subtitle1"> Total Groups </Typography>
            
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} mx='auto' my='auto'>
        <Card style={{backgroundColor:'#F78A72', 'width': '257px',
    'height': '136px',
    'borderRadius': '25px',
    'boxShadow' : '5px 15px 25px #b0b0b0'}}>
          <CardContent>
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={100*((data.length-groupAssigned.length)/(data.length))} size={70}/>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2"> {data.length} </Typography>
            </Box>
          </Box>
            
            
            <Typography variant="subtitle1"> Groups Without Assignment</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} mx='auto' my='auto'>
        <Card style={{backgroundColor:'#BFBAFF','width': '257px',
    'height': '136px',
    'borderRadius': '25px',
    'boxShadow' : '5px 15px 25px #b0b0b0'}}>
          <CardContent>
            <Typography variant="h2"> {users.length} </Typography>
            <Typography variant="subtitle1"> Total Volunteers </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} mx='auto' my='auto'>
        <Card style={{backgroundColor:'#89D9E0','width': '257px',
    'height': '136px',
    'borderRadius': '25px',
    'boxShadow' : '5px 15px 25px #b0b0b0'}}>
          <CardContent>
            <Typography variant="h2"> {usersNotInGroup.length} </Typography>
            <Typography variant="subtitle1"> Ungrouped Volunteers </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// styling //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  grid: {
    flexGrow: 1,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '25ch',
  },
  card: {
    height: '150',
    width: '150',
    margin: "left",
    alignContent: "center",
    marginLeft: theme.spacing(2),
    borderRadius: "2em",
    justifyContent:'center'
  },
  margin: {
    justify: 'center',

  },
  addButton: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    paddingTop: '40'
  },
  labelAsterisk: {
    color: "#b71c1c"
  },
  table: {
    height:'100%',
    minWidth: '650',
    width: '100%'
  },
  tableheader:{
    flexDirection:'row',
    justifyItems:'left'
  }


}));


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// GROUP TABLE COMPONENTS /////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

////////// ROW COMPONENT //////////
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [foundUsers, setUsers] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [usersInGroup, setUsersInGroup] = React.useState([]);

  useEffect(() => {
    db.collection('User').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const user=doc.data();
        user.id=doc.id;
        if (row.users.find(o => o === user.id) === user.id) {
          setUsers(prevState=> [...prevState,user]);
        }
        //setIdList(prevState=> [...prevState,doc.id]);
        //console.log(user);
        
      })
      
    })
    .catch(function (error) {
        console.log("error: ", error);
    })

    db.collection('Groups').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const group=doc.data();
        group.id=doc.id;
        if (group.users.length>0){
          setData(prevState=> [...prevState,group]);
          setUsersInGroup(prevState=> [...prevState,group.users]);
          
        }
        
       
        
        //const result = group.users.every(val => users.includes(val));
        //setUsersNotInGroup(pre)
        //setIdList(prevState=> [...prevState,doc.id]);
      })
      
    })
    .catch(function (error) {
        console.log("error: ", error);
    })


  }, []);


  /// aleart snack bar ///
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: "",
    message: ""
  })
  
  function handleSnackBarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState(prevState => ({
      ...prevState,
      open: false
    }));
  }
  const validationStates = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  }

  ///// end of alert snack bar
 
  const [checked, setChecked] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(foundUsers.slice().fill(false));
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const toggleCheckboxValue = (index) => {
    setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
  }

  const [rowSelected, setRowSelected] = React.useState(foundUsers.slice().fill(false));
  const toggleSelectedRowValue=(index)=>{
    setRowSelected(rowSelected.map((v, i) => (i === index ? !v : v)));
  }
  //const [openMore,setOpenMore]=React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMore = Boolean(anchorEl);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [editChecked, setEditChecked] = React.useState(false);
  const handleEditClick =() => {
    handleMoreClose();
    setEditChecked(true);
  }
  const handleClickAway=() => {
    setEditChecked(false);
  }

  const [deleteDialog,setDeleteDialog] = React.useState(false);
  const handleDeleteClick = () => {
    handleMoreClose();
    setDeleteDialog(true);
  }

  const handleDeleteUser = async function (userid) {
    const id=row.id
    var filtered;
    const usersInGroup=[];
    db.collection('Groups').doc(id).get().then((doc) => {
      const group=doc.data()
      
      filtered = group.users.filter(function(value, index, arr){ 
        return value != userid;
      });
      
      db.collection('Groups').doc(id).update({
        users:filtered
      })
      
      
      
    }).catch((error) => {
      return {
        state:validationStates.ERROR,
        message:`Error occurred when trying to delete ${userid}.`
      }
     
    })

    
    
    return {
      state:validationStates.SUCCESS,
      message:`${userid} has been deleted successfully.`
    }

  }

  /// user icon ///

  const [useranchorEl, setuserAnchorEl] = React.useState(null);
  const openMoreUser = Boolean(useranchorEl);

  const handleMoreClickUser = (event) => {
    setuserAnchorEl(event.currentTarget);
  };

  const handleMoreCloseUser = () => {
    setuserAnchorEl(null);
  };

  
  const [openMoveDialog,setOpenMoveDialog] =useState(false);
  const handleCloseMoveUsers = () => {
    setOpenMoveDialog(false);
    //e.preventDefault();
    
  }
  const handleMoveClickUser =() => {
    handleMoreCloseUser();
    setOpenMoveDialog(true);
  }
  const [newGroup, setnewgroup] = React.useState("");
  const handleMoveMember=(user) => {
    handleCloseMoveUsers();
    db.collection('Groups').doc(newGroup).get().then((doc) => {
      const group=doc.data();
      group.id=doc.id;
      if (!group.users.includes(user)){
        var newgroup=group.users;
        newgroup.push(user);
        db.collection('Groups').doc(newGroup).update({
          users: newgroup
        })
        handleDeleteUser(user);
      }
    }
    )
    
  }

  const [deleteDialogUser,setDeleteDialogUser] = React.useState(false);
  const handleDeleteClickUser = () => {
    handleMoreCloseUser();
    setDeleteDialogUser(true);
  }

  ///////////
  
  const handleDeleteGroup = () => {
    const id=row.id
    setDeleteDialog(false);
    db.collection('Groups').doc(id).delete().then(() => {
      setSnackBarState({
        state:validationStates.SUCCESS,
        message:`${id} has been deleted successfully.`
      })
      
      
    }
    ).catch((error) => {
      setSnackBarState({
        state:validationStates.ERROR,
        message:`Error occurred when trying to delete ${id}.`
      })
     
    })
   

    
  }
////

  
  return (
    
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell padding="checkbox"> 
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </TableCell>
        <TableCell size = "small"> 
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        <TableCell component="th" scope="row" align="right" size = "medium" >{row.id}</TableCell>
        <TableCell align="right" size = "medium">{row.users.length}</TableCell>
        <TableCell align="right" size = "medium">{row.assignment}</TableCell>
        <TableCell align="right" size = "small">
          <IconButton onClick={handleMoreClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu 
            anchorEl={anchorEl}
            keepMounted
            open={openMore}
            onClose={handleMoreClose}>
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              <Dialog open = {editChecked} onClose = {() => setEditChecked(false)} >
                  <DialogTitle id="form-dialog-title">Edit Group</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Do you want to delete group: {row.id}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={() => setEditChecked(false)} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={() => {handleDeleteGroup().then(msg=>{
                          setSnackBarState({
                            open: true,
                            severity: msg.state.toLowerCase(),
                            message: msg.message
                          })
                        });}} color="primary">
                    Save
                  </Button>
                  </DialogActions>
              </Dialog>
            
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
              <Dialog open = {deleteDialog} onClose = {() => setDeleteDialog(false)} >
                <DialogTitle id="form-dialog-title">Delete Group</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Do you want to delete group: {row.id}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setDeleteDialog(false)} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteGroup} color="primary">
                  Delete
                </Button>
                </DialogActions>
              </Dialog>
            { isChecked.filter(Boolean).length>=2 && (<MenuItem onClick={handleDeleteClick}> Delete Members</MenuItem>)}
          </Menu>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: "checkbox"}} colSpan={6}>
          <Collapse in={open} timeout="auto"  style={{ display: "block" }}>
           
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right">Email Address</TableCell>
                    <TableCell align="right">Preferred Contact Method</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foundUsers.map((user,index) => (
                    
                    
                    <TableRow key={user.id} selected={rowSelected[index]}>
                      <TableCell padding="checkbox"> 
                          {editChecked ? 
                          <IconButton onClick={() => toggleSelectedRowValue(index)} >
                            <RemoveCircleOutlineIcon />
                          </IconButton> 
                            :
                          <Checkbox
                            key={index}
                            checked={isChecked[index]}
                            onClick={() => {toggleCheckboxValue(index); toggleSelectedRowValue(index)}}
                            
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />}
                          
                      </TableCell>
                      
                      <TableCell align="right"  size = "medium" >{user.firstName} {user.lastName}</TableCell>
                      <TableCell align="right" size = "medium"></TableCell>
                      <TableCell align="right"  size = "medium"></TableCell>
                      <TableCell align="right"  size = "medium" >{user.phone}</TableCell>
                      <TableCell align="right" size = "medium">{user.email}</TableCell>
                      <TableCell align="right" size = "small">{user.emailNotifications ? <EmailIcon color="primary"/> : <MailOutlineIcon color="inherit"/>} {user.sms ? <MessageIcon color="primary"/> : <SpeakerNotesOffOutlinedIcon color="inherit"/>} </TableCell>
                      <TableCell align="right">
                          <IconButton onClick={handleMoreClickUser}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu 
                            anchorEl={useranchorEl}
                            keepMounted
                            open={openMoreUser}
                            onClose={handleMoreCloseUser}>
                            <MenuItem onClick={handleMoveClickUser}>Move</MenuItem>
                              <Dialog open = {openMoveDialog} onClose = {()=> setOpenMoveDialog(false)} >
                                  <DialogTitle id="form-dialog-title">Move Member</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText component={'span'}>
                                      Move {user.firstName} {user.lastName} to another group:
                                      
                                      <Autocomplete
                                        id="name-search"
                                        options={data}
                                        component={Paper}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => (option.id)}
                                        style={{ width: 300 }}
                                        filterSelectedOptions
                                        onInputChange={(event, newValue) => { setnewgroup (newValue)}}
                                        renderInput={(params) => <TextField {...params} required label="Name" />}
                                      />
                                      
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={()=> {setOpenMoveDialog(false)}} color="secondary" value = "Cancel">
                                      Cancel
                                    </Button>
                                    <Button onClick={()=>{handleMoveMember(user.id);setOpenMoveDialog(false);}} color="primary">
                                      Save
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                            
                            <MenuItem onClick={()=>{handleDeleteClickUser();setDeleteDialog(false);}}>Delete</MenuItem>
                              <Dialog open = {deleteDialogUser} onClose = {() => setDeleteDialogUser(false)} >
                                <DialogTitle id="form-dialog-title">Delete Member</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Do you want to delete member: {user.firstName} {user.lastName}?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={() => setDeleteDialogUser(false)} color="secondary">
                                  Cancel
                                </Button>
                                <Button onClick={()=>{handleDeleteUser(user.id);setDeleteDialogUser(false)}} color="primary">
                                  Delete
                                </Button>
                                </DialogActions>
                              </Dialog>
                          </Menu>
                        </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

          </Collapse>
        </TableCell>
      </TableRow>
    
    <AlertSnackbar
    open={snackBarState.open}
    severity={snackBarState.severity}
    autoHideDuration={6000}
    onClose={handleSnackBarClose}>
    {snackBarState.message}
    </AlertSnackbar>
    </React.Fragment>
    
  );
}

///////// ACTUAL TABLE ////////////////
Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  }
  return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
  if (!this.inArray(comparer)) {
      this.push(element);
  }
}; 

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };
////////////////////////
export const GroupTable = (props) => {
  const [data, setData] = useState([]);
  const [rows,setRows] = useState([]);
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  useEffect(() => {
    async function getGroups() {
      
      db.collection('Groups').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const group=doc.data();
        group.id=doc.id;
        //console.log(doc.id, " => ", doc.data());
        if (data.length >0) {
          data.pushIfNotExist(group,function(e) {
            return e.id === group.id
          })
        } else {
          if (group.users.length>0){
            setData(prevState=> [...prevState,group]);
            setRows(prevState=>[...prevState,group]);
          }
          
        }
        
      
        //setIdList(prevState=> [...prevState,doc.id]);
      })
      
    })
    .catch(function (error) {
        console.log("error: ", error);
    })}
    getGroups();

  }, []);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const columns = [
    {field: 'icon', headerName: "", width: 70},
    {field: 'name', headerName:'Name', width: 130},
    {field: 'number', headerName: 'Number of Volunteers', width: 100},
    {field: 'assigned', headerName: 'Route Assigned', width: 100},
    {field: 'phone', headerName: 'Phone Number', width: 130},
    {field: 'email', headerName: 'Email Address', width: 150},
    {field: 'preferred', headerName: 'Preferred Contact Method', width: 100}
  ]

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.id.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
    if (searchedVal.length==0){
      setData(rows);
    }
   
    };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setData(rows);
  };

  /// aleart snack bar ///
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    severity: "",
    message: ""
  })
  
  function handleSnackBarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState(prevState => ({
      ...prevState,
      open: false
    }));
  }
  const validationStates = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  }
  return (
    <div>
       <Grid container spacing={2}>
         <Grid item xs={6}>
          <Searchbar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          cancelOnEscape={true}
          style={{
            margin: '0 auto',
            width: '100%',
            align: 'left',
            border: '1px solid black',
            
          }}
          />
         </Grid>
         <Grid item xs> <FullScreenDialog/></Grid>
         <Grid item xs> <Button color="secondary" variant = "outlined"> Import CSV </Button></Grid>
      </Grid>
    
      
    <TableContainer component = {Paper}>
      <Table aria-label="collapsible table">
        {}
        <TableHead>
          <TableRow>
              <TableCell padding="checkbox"> 
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>

            <TableCell size="small"/>
            <TableCell align="right"> Name </TableCell>
            <TableCell align="right"> Number of Volunteers </TableCell>
            <TableCell align="right"> Route Assigned </TableCell>
            <TableCell size="small">
              <IconButton>
                  <MoreVertIcon />
              </IconButton>
              
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data).map((row) => (
              
            <Row key={row.id} row={row}>
              
            </Row>
            
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

    </TableContainer>
    <AlertSnackbar
    open={snackBarState.open}
    severity={snackBarState.severity}
    autoHideDuration={6000}
    onClose={handleSnackBarClose}>
    {snackBarState.message}
    </AlertSnackbar>

    
    </div>
    //<div style={{height: '100%', width:'100%',minWidth:'650'}}>
    //  <DataGrid  rows={data} columns={columns} pageSize={5} checkboxSelection />
    // </div>
  );
};

