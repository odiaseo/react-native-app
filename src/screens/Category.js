import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import TabBar from '../components/navigation/TabBar';
import {bindActionCreators} from "redux";
import {ActionCreators} from "../actions";
import {connect} from "react-redux";
import SiteActivityIndicator from "../components/SiteActivityIndicator";
import HeaderRight from "../components/HeaderRight";
import {List, ListItem} from 'react-native-elements'
import _ from 'lodash';
import commonStyles, {styleVariables} from '../common/styles';
import * as util from '../common/helperFuntions';

class Category extends Component {

    static navigationOptions = {
        title: 'CATEGORIES',
        headerRight: (<HeaderRight/>),
    };

    componentDidMount() {
        if (this.props.categories.length === 0) {
            this.props.setActivityStatus(true);
            this.props.getCategories();
        }
    }

    renderResultPage() {
        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }

        let list = this.props.categories;

        return (
            <ScrollView>
                <List containerStyle={commonStyles.listContainerStyle}>
                    {
                        list.map((category, index) => (
                            <ListItem
                                leftIcon={{name: util.getIconName(category.icon_class_name), type: 'font-awesome'}}
                                key={index}
                                subtitle={util.renderOfferCount(category.stats.voucher_count)}
                                titleStyle={{fontSize: styleVariables.mainTextFontSize}}
                                subtitleStyle={{fontSize: styleVariables.infoTextFontSize, fontWeight: 'normal'}}
                                containerStyle={{borderBottomColor: styleVariables.borderColor, marginTop: 0}}
                                title={category.title}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderResultPage()}
                <TabBar {...this.props}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        categories: _.isEmpty(state.categories) ? [] : Object.values(state.categories),
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Category);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#ffffff'
        },
        body: {
            flex: 1
        },
        divider: {
            borderTopWidth: 0.5,
            borderColor: '#3e3e3e',
            height: 2
        }
    }
);