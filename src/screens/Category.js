import React, {Component} from "react";
import {ScrollView} from "react-native";
import {List} from "react-native-elements";
import commonStyles from "../common/styles";
import _ from "lodash";
import withConnect, {withIndicator} from "../config/hoc";
import BaseLayout from "../components/layout/BaseLayout";
import PropTypes from "prop-types";
import CategoryListItem from "../components/category/CategoryListItem";

class Category extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const list = this.props.categories.filter((cat) => cat.id !== 1);
        return (
            <BaseLayout {...this.props} showSearch={false}>
                {this.props.children}
                <ScrollView>
                    <List containerStyle={commonStyles.listContainerStyle}>
                        {list.map((cat, index) => <CategoryListItem key={index} category={cat} {...this.props}/>)}
                    </List>
                </ScrollView>
            </BaseLayout>
        );
    }
}

function mapStateTopProps(state) {
    return {
        categories: _.isEmpty(state.categories) ? [] : Object.values(state.categories),
        showLoading: state.refreshStatus,
    };
}

Category.propTypes = {
    categories: PropTypes.array,
    navigation: PropTypes.object,
    children: PropTypes.node,
    getCategories: PropTypes.func,
};

export default withConnect(withIndicator(Category), mapStateTopProps);