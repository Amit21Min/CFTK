import React, {useState, useRef, useEffect} from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

// Expects a prop of menu items and functions, ex:
// props.items = [{text: "Edit", action: editFunction}, {text: "Assign", action: assignFunction}]
const OverflowMenu = (props) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, callback) => {
    // If there is a callback available, fire it. Arguments for the callback must be bound before/while being passed in as props to this component
    if(callback){
      callback();
    };
    if(anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return(
    <div>
      <IconButton ref={anchorRef} onClick={handleToggle} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true">
        <MoreVertIcon/>
      </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    {props.items.map((item, index) => (
                      <MenuItem key={index} onClick={(event) => handleClose(event, item.action)}>{item.text}</MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
};

export default OverflowMenu;