import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Nav, Drawer, Sidenav } from 'rsuite';
import { CgMenuLeft } from "react-icons/cg";
import IMAGES from "../assets/images";

/*  README: This component heavily relies on rsuite and react-bootstrap. install both dependencies and import both css below
    import 'rsuite/dist/rsuite.min.css';
    import "bootstrap/dist/css/bootstrap.min.css";

    const menuItems = [
        { 
        label: "Label One",
        icon: Icon,
        subMenu: [
            {
                label: "Sub Menu One",
                onClickParams: {evtName: 'subMenuOneEvt'},
            },
            { 
                label: "Sub Menu Two", 
                onClickParams: {evtName: 'subMenuTwoEvt'} 
            },
            ...
        ]
        },
        { label: "Label Two", onClickParams: {evtName: 'menuTwoEvt'} },
        ...
    ];
*/

const OffcanvasMenu = ({ menuItems, menuItemClick = () => {}, variant="success" }) => {
	/*	to look at later: https://w3collective.com/react-sidebar-navigation-component/	*/
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const menusIteration = () => menuItems.map((menu, idx) => menu.subMenu ? buildNavDropDown(menu, idx) : buildMenuItem(menu, idx) );

    const buildMenuItem = (menu, idx) => {
        const Icon = menu.icon;
        return (
            <Nav.Item 
                eventKey={idx} 
                key={idx} 
                className="mb-1"
                icon={menu.icon && <Icon />} 
                onClick={(e) => {
                    handleClose();
                    menuItemClick(onClickParams, e);
                }}> 
                {menu.label} 
            </Nav.Item>
        )
    };

    const buildNavDropDown = (menu, idx) => {
        const Icon = menu.icon;
        return <Nav.Menu title={menu.label} key={idx} icon={menu.icon && <Icon />} className="" >
            {menu.subMenu.map((m, i) => {
                return (
                    <Nav.Item 
                        eventKey={`${idx}-${i}`} 
                        key={`${idx}-${i}`}
                        className="mb-1"
                        onClick={(e) => {
                            handleClose();
                            menuItemClick(onClickParams, e);
                        }}> 
                        {m.label} 
                    </Nav.Item>)
            })}
        </Nav.Menu>
    }

	const style = {
		position: 'fixed',
		bottom: "100px",
		right: '30px',
		cursor: 'pointer',
		zIndex: 999,
		boxShadow: '4px 4px 4px #9E9E9E',
		maxWidth: '50px'
	}

	return (
		<>
			<div style={style} className={`m-2 p-2 rounded bg-${variant} text-white rounded-5 d-flex justify-content-center`} onClick={handleShow}>
				<CgMenuLeft size={"30px"} />
			</div>

			<Offcanvas show={show} onHide={handleClose} placement="start">
				<Offcanvas.Header closeButton className="align-items-start">
					<Drawer.Title className="w-100 text-center">
						<img src={IMAGES.logo} width={"110px"} />
					</Drawer.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
                    <Sidenav className='bg-white'>
                        <Sidenav.Body>
                            <Nav className="d-flex flex-column gap-2">
                                {menuItems && menusIteration()}
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
export default OffcanvasMenu;
