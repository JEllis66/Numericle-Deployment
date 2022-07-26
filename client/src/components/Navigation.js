import React from "react";
import {Link} from "react-router-dom";
import {useState} from 'react';
import Menu from "./Menu.js";
import Stats from "./Stats.js";
import Help from "./Help.js";
import Settings from "./Settings.js";
import UserLogin from "./User/UserLogin.js";
import NewUser from "./User/NewUser.js";

import menu1 from "../images/menu_light.png";
import menu2 from "../images/menu_hover.png";
import stats1 from "../images/stats_light.png";
import stats2 from "../images/stats_hover.png";
import help1 from "../images/help_light.png";
import help2 from "../images/help_hover.png";
import settings1 from "../images/settings_light.png";
import settings2 from "../images/settings_hover.png";
import logo from "../images/logo.png";
import greenGrid from "../images/greenGrid.png";
import yellowGrid from "../images/yellowGrid.png";
import grayGrid from "../images/grayGrid.png";
import tutorial from "../images/tutorial_graphic.png";
import outOfBounds from "../images/out_of_bounds.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () =>{

    const [menuPopup, setMenuPopup] = useState(false);
    const [statsPopup, setStatsPopup] = useState(false);
    const [helpPopup, setHelpPopup] = useState(false);
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [userLoginPopup, setUserLoginPopup] = useState(false);
    const [newLoginPopup, setNewLoginPopup] = useState(false);

    return (

        <div id="nav" className="container d-flex justify-content-between align-middle mt-3">
            <div className="col-0">
                <Menu trigger={menuPopup} setTrigger={setMenuPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> Menu:</h2>
                        <button className="closePopUp" onClick={()=> {setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setMenuPopup(!menuPopup)}}>X</button>
                    </div>
                    <ul className="row d-flex text-start mt-3 pb-4">
                        <li className="mt-2 mb-2"><Link className="text-decoration-none" to={"/home"}>Home</Link></li>
                        <li onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setNewLoginPopup(false); setUserLoginPopup(!userLoginPopup)}} className="mb-2"><a className="text-decoration-none" href="#">User Login</a></li>
                        <li className="mb-2"><Link className="text-decoration-none" to={"/discussion"}>Daily Discussion</Link></li>
                        <li className="mb-2"><a className="text-decoration-none" href="https://github.com/JEllis66/Numericle-Depolyment">Numericle's GitHub Repo</a></li>
                    </ul>    
                </Menu>
                <Stats trigger={statsPopup} setTrigger={setStatsPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> Stats:</h2>
                        <button className="closePopUp" onClick={()=> {setMenuPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setStatsPopup(!statsPopup)}}>X</button>
                    </div>
                    <div className="row d-flex justify-content-start mt-3">
                        <p>User stats will go here...</p>
                    </div>    
                </Stats>
                <Help trigger={helpPopup} setTrigger={setHelpPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> Help:</h2>
                        <button className="closePopUp" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setHelpPopup(!helpPopup)}}>X</button>
                    </div>
                    <div className="row d-flex justify-content-center mt-3">
                        <h2 className="text-primary mb-4"> How to Play:</h2>
                        <p className="fw-bold text-center mt-2 mb-3">Solve the Puzzle by finding Today's Equation that is equal to Today's Solution: </p>
                        <hr/>
                        <img id="tut0IMG" className="mt-3 mb-3" src={tutorial}/>
                        <hr/>
                        <p className="fw-bold"> <span className='text-success fw-bold'> 4 of the equation's total 10 characters (2 operators, and 2 digits) are revealed to help you.</span> Find the <u>6 Missing Characters</u> from the Daily Equation! </p>
                        <p className="fst-italic mt-4">Upon entering a guess, you can use the following indicators to assist you on your search for the solution:</p>
                        <hr/>
                        <div className=" justify-content-center mt-2 mb-3">
                            <img className="tutIMG" src={greenGrid}/>
                            <p className="mt-4 mb-3 text-start">A <span className='text-success fw-bold'>Green</span> background incidcates that you have found a missing character. This number or operator matches the position in the daily equation. The on-screen keyboard will highlight this character <span className='text-success fw-bold'>green</span>. (Hint: this character can be found again as another missing character)! </p>
                            <hr/>
                        </div>
                        <div className=" justify-content-center mt-2 mb-3">
                            <img className="tutIMG" src={yellowGrid}/>
                            <p className="mt-4 mb-3 text-start">A <span className='text-warning fw-bold'>Yellow</span> background indicates that you have found one of the 6 missing characters from the daily equation, but your guess is in the incorrect position. The on-screen keyboard will highlight this character <span className='text-warning fw-bold'>yellow</span>.</p>
                            <hr/>
                        </div>
                        <div className=" justify-content-center mt-2 mb-3">
                            <img className="tutIMG" src={grayGrid}/>
                            <p className="mt-4 mb-3 text-start">A <span className='text-secondary fw-bold'>Gray</span> background indicates that this character does not belong at this position. The on-screen keyboard will <span className='fw-bold'>darken</span> this charater's key if the character does not match any of the 6 missing characters in the daily equation.</p>
                        </div>
                        <hr/>
                        <div className=" justify-content-center mt-2 mb-3">
                            <img className="tut2IMG" src={outOfBounds}/>
                            <p className="mt-4 mb-3 text-start">One of the cases from the image above will display if the entered equation is out of bounds (Less than 0, or Greater than 999).</p>
                        </div>

                    </div>    
                </Help>
                <Settings trigger={settingsPopup} setTrigger={setSettingsPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> Settings:</h2>
                        <button className="closePopUp" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setSettingsPopup(!settingsPopup)}}>X</button>
                    </div>
                    <p className="mt-4" >Settings will go here...</p>
                    {/* <label className="d-flex text-start mt-4 mb-2">
                        <span>Dark Mode</span>
                        <input type="checkbox"/>
                    </label>
                    <label className="d-flex text-start mt-2 mb-2">
                        <span className="mr-3">Hard Mode</span>
                        <input className="mr-3" type="checkbox"/>
                    </label>     */}
                </Settings>
                <UserLogin trigger={userLoginPopup} setTrigger={setUserLoginPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> User Login:</h2>
                        <button className="closePopUp" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setNewLoginPopup(false); setUserLoginPopup(!userLoginPopup)}}>X</button>
                    </div>
                    <div className="row d-flex text-start mt-3">
                        <form className="form">
                            <div className="mb-1">
                                <label className="form-label">
                                    Email Address:
                                    <input type="email" className="form-control"/>
                                </label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Password:
                                    <input type="password" className="form-control"/>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary mb-4">Login</button>
                            <div className="mb-4">
                                <a href="#" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(!newLoginPopup)}}>Create Account</a>
                            </div>
                        </form>
                    </div>    
                </UserLogin>
                <NewUser trigger={newLoginPopup} setTrigger={setNewLoginPopup}>
                    <div className="d-flex justify-content-between">
                        <h2 className="text-secondary"> New Login:</h2>
                        <button className="closePopUp" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(!newLoginPopup)}}>X</button>
                    </div>
                    <div className="row d-flex text-start mt-4">
                        <form className="form">
                            <div className="mb-1 d-flex row justify-content-around">
                                <div></div>
                                <label className="form-label col-6">
                                    Email Address:
                                    <input type="email" className="form-control"/>
                                </label>
                                <label className="form-label col-6">
                                    Username:
                                    <input type="text" className="form-control"/>
                                </label>
                                <div></div>
                            </div>
                            <div className="mb-3 d-flex row justify-content-around">
                            <div></div>
                                <label className="form-label col-6">
                                    Password:
                                    <input type="password" className="form-control"/>
                                </label>
                                <label className="form-label col-6">
                                    Confirm Password:
                                    <input type="password" className="form-control"/>
                                </label>
                                <div></div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(!userLoginPopup); setNewLoginPopup(!newLoginPopup)}} type="submit" className="btn btn-primary ml-5 mb-4 mt-3 ">Create User</button>
                            </div>
                        </form>
                    </div>       
                </NewUser>
            </div>
            <div className="col-3 d-flex justify-content-start" id='leftNav'>
                <img className="icons mt-2 ml-0" id="icon1" src={menu1} alt="menu.png" onClick={()=> {setStatsPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setMenuPopup(!menuPopup)}} onMouseEnter={e => (e.currentTarget.src = menu2)} onMouseLeave={e => (e.currentTarget.src = menu1)}/>
                <img className="icons mt-2 ml-0" id="icon2" src={stats1} alt="stats.png" onClick={()=> {setMenuPopup(false); setHelpPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setStatsPopup(!statsPopup)}} onMouseEnter={e => (e.currentTarget.src = stats2)} onMouseLeave={e => (e.currentTarget.src = stats1)}/>
            </div>
            <h1 className="text-primary pt-2 col-6 mt-0">
                <Link className='text-decoration-none' to={"/"}><p><span><img className="icons mb-2" id="logoTop" src={logo} alt="numericleLogo.png"/></span>umericle</p></Link>
            </h1>
            <div className="col-3 d-flex justify-content-end" id="rightNav">
                <img className="icons mt-2" id="icon3" src={help1} alt="help.png" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setSettingsPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setHelpPopup(!helpPopup)}} onMouseEnter={e => (e.currentTarget.src = help2)} onMouseLeave={e => (e.currentTarget.src = help1)}/>
                <img className="icons mt-2" id="icon4" src={settings1} alt="settings.png" onClick={()=> {setMenuPopup(false); setStatsPopup(false); setHelpPopup(false); setUserLoginPopup(false); setNewLoginPopup(false); setSettingsPopup(!settingsPopup)}} onMouseEnter={e => (e.currentTarget.src = settings2)} onMouseLeave={e => (e.currentTarget.src = settings1)}/>
            </div>
        </div>
    )
}



export default Navigation;