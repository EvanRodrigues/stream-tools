import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import { setColors } from "../actions/colors";
import { setGoal } from "../actions/goal";
import { setUser } from "../actions/user";
import { login } from "../actions/isLogged";
import "../stylesheets/css/nav.css";
import "../stylesheets/css/home.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

export const Home = (props) => {
    const cookies = new Cookies();
    let user = useSelector((state) => state.user);
    let isLogged = useSelector((state) => state.isLogged);
    let dispatch = useDispatch();

    const formatToTwoDecimals = (number) => {
        number = parseFloat(number);
        return number.toFixed(2);
    };

    const fetchUser = () => {
        //Get cookie if user is not set
        if (user === "") user = cookies.get("streamToolsUser");

        //Check if cookie is set
        if (user != null) {
            dispatch(setUser(user));
            dispatch(login());

            //Get initial values from db.
            fetch(`${url}/api/goal/match/${user}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 404) {
                        fetch(`${url}/api/goal/`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ channel: user }),
                        })
                            .then((userResponse) => userResponse.json())
                            .then((userJson) => {
                                dispatch(
                                    setGoal({
                                        progress: formatToTwoDecimals(
                                            userJson["progress"]
                                        ),
                                        target: formatToTwoDecimals(
                                            userJson["goal"]
                                        ),
                                        name: userJson["name"],
                                        accessToken: userJson["accessToken"],
                                        tokenSet: false,
                                    })
                                );

                                const colors = userJson["colors"];
                                dispatch(setColors(colors));
                            });
                    }
                })
                .then((json) => {
                    if (json == null) return;

                    dispatch(
                        setGoal({
                            progress: formatToTwoDecimals(json["progress"]),
                            target: formatToTwoDecimals(json["goal"]),
                            name: json["name"],
                            accessToken: json["accessToken"],
                            tokenSet: json["tokenSet"],
                        })
                    );

                    const colors = json["colors"];
                    dispatch(setColors(colors));
                });
        }
    };

    useEffect(fetchUser, []);

    if (isLogged === false)
        return (
            <div id="content">
                <Login />
            </div>
        );
    return (
        <div id="content">
            <Nav />

            <div>
                <h1>Welcome to Stream Tools!</h1>

                <div className="home-news news-left">
                    <h3 className="news-header">Recent News</h3>

                    <p>
                        Today I added some content to the home page! This page
                        used to be completely empty, but now theres this text
                        and the amazing header above it. Lately, I've been
                        trying to better the user experience. This includes a
                        better, more detailed login screen. Also, I've included
                        a change in the Goal Dashboard when adding the socket
                        token detailing the process.
                    </p>
                </div>

                <div className="home-news news-right">
                    <h3 className="news-header">Plans</h3>

                    <ul className="plans">
                        <li>Better mobile experience.</li>
                        <li>Add another widget.</li>
                        <li>Buy a domain for stream tools.</li>
                        <li>Upgrade hosting plan on heroku.</li>
                        <li>
                            A list of the streamers currently using the
                            platform.
                        </li>
                        <li>Add more interesting content to this page!</li>
                    </ul>
                </div>

                <div className="home-news news-left">
                    <h3 className="news-header">The Tools</h3>

                    <h4>Goal Bar</h4>
                    <p>
                        Currently the only tool available is a fundraising goal
                        bar. This bar combines all of the StreamLabs goal bars
                        into one bar. So instead of having three bars (bits,
                        subscribers, paypal/credit card donations) you only need
                        one!
                    </p>

                    <h4>Emote Counter (Coming Soon!)</h4>
                    <p>
                        The next tool I want to add is an emote counter. With
                        this, you can keep track of how often an emote gets
                        used. You can reset the counter every stream, or leave
                        it alone and watch the numbers rise!
                    </p>
                </div>

                <div className="home-news news-right">
                    <h3 className="news-header">
                        Featured Streamers (Coming Soon!)
                    </h3>

                    <p>
                        This section will be used to list the streamers that are
                        currently live using the platform.
                    </p>
                </div>
            </div>
        </div>
    );
};
