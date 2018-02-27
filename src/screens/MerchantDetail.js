import React, {Component} from 'react'
import {StyleSheet, Image, Linking, View, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabBar from '../components/navigation/TabBar';
import {styleVariables} from "../common/styles";
import {Text, Button, Rating} from 'react-native-elements'
import HeaderRight from '../components/HeaderRight';
import * as util from '../common/helperFuntions';
import AboutSection from "../components/AboutSection";
import {ActionCreators} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';

class MerchantDetail extends Component {

    constructor(props) {
        super(props);

        this.openExternalLink = this.openExternalLink.bind(this);
        this.renderStoreButton = this.renderStoreButton.bind(this);
        this.renderCategorySection = this.renderCategorySection.bind(this);
    }

    static navigationOptions = ({navigation}) => {

        const {params} = navigation.state;

        return {
            title: params ? params.tempData.title : 'STORE DETAIL',
            headerRight: (<HeaderRight/>)
        };
    };

    openExternalLink() {
        Linking.openURL(this.props.merchant.outlink).catch(err => console.error('An error occurred', err));
    }

    renderStoreButton() {
        if (this.props.showLoading) {
            return null;
        }

        return (
            <View style={{flex: 1}}>
                <Button
                    backgroundColor={styleVariables.dealColor}
                    iconRight={{name: 'shopping-cart'}}
                    onPress={this.openExternalLink.bind(this)}
                    containerViewStyle={{marginTop: 60, alignContent: 'stretch'}}
                    title={'Visit ' + this.props.merchant.title}/>
            </View>
        );
    }

    renderCategorySection() {
        if (this.props.showLoading) {
            return null;
        }

        return (
            <View>
                <Text style={styles.merchantTitle}>
                    {
                       // this.props.merchant.category.title + ' ' + util.renderOfferCount(this.props.merchant.category.stats.voucher_count, true)
                    }
                </Text>
                <Rating
                    type="star"
                    fractions={1}
                    startingValue={9}
                    readonly={true}
                    imageSize={13}
                    style={{paddingVertical: 10}}
                />
            </View>

        );
    }

    componentDidMount() {
        this.props.setActivityStatus(true);
        this.props.findMerchantById(this.props.navigation.state.params.tempData.id);
    }

    render() {
        let tempData = this.props.navigation.state.params.tempData;

        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.detailsWrapper}>
                            <Image source={{uri: tempData.logo}} style={styles.image}/>
                            <View style={styles.details}>
                                <Text style={styles.offerTitle}>{tempData.title}</Text>
                                {this.renderCategorySection()}
                            </View>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="monetization-on" size={24} color={styleVariables.primaryColor}/>
                            <Text style={styles.rowItemText}>{tempData.title}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="folder" size={24} color={styleVariables.couponColor}/>
                            <Text style={styles.rowItemText}>{tempData.title}</Text>
                        </View>

                        {
                            !this.props.showLoading && <AboutSection
                                title={this.props.merchant.title}
                                description={this.props.merchant.description}
                            />
                        }

                        {this.renderStoreButton()}
                    </View>
                </ScrollView>
                <TabBar {...this.props}/>
            </View>


        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        merchant: _.isEmpty(state.merchantDetails) ? {} : state.merchantDetails,
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(MerchantDetail);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: styleVariables.backgroundColor
        },

        body: {
            flex: 1,
        },

        rowItems: {
            flexDirection: 'row',
            alignContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: styleVariables.borderColor
        },

        rowItemText: {
            marginTop: 5,
            marginLeft: 10
        },

        image: {
            width: 120,
            height: 90,
            borderWidth: 1,
            marginRight: 10,
            borderColor: '#cccccc',
        },
        detailsWrapper: {
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            padding: 20,
        },

        details: {
            flex: 1,
            alignItems: 'flex-start',
        },

        offerTitle: {
            fontSize: 14,
        },

        merchantTitle: {
            fontSize: 12,
            marginTop: 5,
        }
    }
);
