import React, {Component,} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import HomeTopBar from '../components/home/HomeTopBar';
import CouponScroller from '../components/home/CouponScroller';
import ImageCarousel from '../components/home/ImageCarousel';
import TabBar from '../components/navigation/TabBar';
import {connect} from 'react-redux';
import {ActionCreators} from "../actions";
import {bindActionCreators} from 'redux';
import commonStyles, {styleVariables} from '../common/styles';
import _ from 'lodash';
import CouponList from "../components/CouponList";

class Home extends Component {
    parentScrollView = null;

    static navigationOptions = {
        title: 'HOME',
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar {...this.props}/>

                <ScrollView ref={(c) => this.parentScrollView = c}>
                    <View style={styles.body}>
                        <View style={{marginBottom: 5}}>
                            <ImageCarousel parentScrollView={this.parentScrollView} {...this.props}/>
                        </View>
                        <CouponScroller sections={this.props.categoryOffers}/>
                        {/*<CouponList {...this.props} list={this.props.coupons}/> */}
                    </View>
                </ScrollView>

                <TabBar navigation={this.props.navigation}/>
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        coupons: _.isEmpty(state.foundCoupons) ? [] : Object.values(state.foundCoupons),
        showLoading: state.refreshStatus.isRefreshing,
        categoryOffers: state.categoryOffers,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            marginTop: 20,
            backgroundColor: styleVariables.backgroundColor
        },

        body: {
            flex: 1,
            justifyContent: 'center',
        },
        divider: {
            borderTopWidth: 0.5,
            borderColor: '#3e3e3e',
            height: 2
        },
        statusBar: {
            backgroundColor: '#25282e'
        }
    }
);