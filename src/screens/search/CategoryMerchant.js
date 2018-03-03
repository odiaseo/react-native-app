import React, {Component} from "react";
import _ from "lodash";
import MerchantList from "../../components/merchant/MerchantList";
import withConnect, {withIndicator} from "../../config/hoc";
import BaseLayout from "../../components/layout/BaseLayout";
import PropTypes from "prop-types";

class CategoryMerchant extends Component {

    componentDidMount() {
        this.props.findMerchantsByCategory(this.props.navigation.state.params.category.id);
    }

    render() {
        return (
            <BaseLayout {...this.props} showSearch={false}>
                {this.props.children}
                <MerchantList {...this.props} list={this.props.merchants}/>
            </BaseLayout>
        );
    }
}

function mapStateTopProps(state) {
    return {
        merchants: _.isEmpty(state.categoryMerchants) ? [] : Object.values(state.categoryMerchants),
        showLoading: state.refreshStatus,
    };
}

CategoryMerchant.propTypes = {
    navigation: PropTypes.object,
    children: PropTypes.node,
    merchants: PropTypes.array,
    findMerchantsByCategory: PropTypes.func
};

export default withConnect(withIndicator(CategoryMerchant), mapStateTopProps);