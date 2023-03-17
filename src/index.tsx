import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "components/app";

import "./global.css";
import { Provider } from "react-redux/es/exports";
import { store } from "store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
