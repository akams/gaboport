import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
// import DemoNavbar from "components/Navbars/DemoNavbar";
// import CardsFooter from "components/Footers/CardsFooter";

// index page sections
// import Hero from "./IndexSections/Hero";
// import Buttons from "./IndexSections/Buttons";
// import Inputs from "./IndexSections/Inputs";
// import CustomControls from "./IndexSections/CustomControls";
// import Menus from "./IndexSections/Menus";
// import Navbars from "./IndexSections/Navbars";
// import Tabs from "./IndexSections/Tabs";
// import Progress from "./IndexSections/Progress";
// import Pagination from "./IndexSections/Pagination";
// import Pills from "./IndexSections/Pills";
// import Labels from "./IndexSections/Labels";
// import Alerts from "./IndexSections/Alerts";
// import Typography from "./IndexSections/Typography";
// import Modals from "./IndexSections/Modals";
// import Datepicker from "./IndexSections/Datepicker";
// import TooltipPopover from "./IndexSections/TooltipPopover";
// import Carousel from "./IndexSections/Carousel";
// import Icons from "./IndexSections/Icons";
// import Login from "./IndexSections/Login";
// import Download from "./IndexSections/Download";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <Hero />
          <Buttons />
          <Inputs />
        </main>
      </>
    );
  }
}

export default Index;
