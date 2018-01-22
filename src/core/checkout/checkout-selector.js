export default class CheckoutSelector {
    /**
     * @constructor
     * @param {BillingAddressSelector} billingAddress
     * @param {CartSelector} cart
     * @param {ConfigSelector} config
     * @param {CountrySelector} countries
     * @param {CustomerSelector} customer
     * @param {InstrumentSelector} instruments
     * @param {OrderSelector} order
     * @param {PaymentMethodSelector} paymentMethods
     * @param {QuoteSelector} quote
     * @param {ShippingAddressSelector} shippingAddress
     * @param {ShippingCountrySelector} shippingCountries
     * @param {ShippingOptionSelector} shippingOptions
     * @param {CacheFactory} cacheFactory
     */
    constructor(
        billingAddress,
        cart,
        config,
        countries,
        customer,
        instruments,
        order,
        paymentMethods,
        quote,
        shippingAddress,
        shippingCountries,
        shippingOptions,
        cacheFactory
    ) {
        this._billingAddress = billingAddress;
        this._cart = cart;
        this._config = config;
        this._countries = countries;
        this._customer = customer;
        this._instruments = instruments;
        this._order = order;
        this._paymentMethods = paymentMethods;
        this._quote = quote;
        this._shippingAddress = shippingAddress;
        this._shippingCountries = shippingCountries;
        this._shippingOptions = shippingOptions;
        this._cacheFactory = cacheFactory;
    }

    /**
     * @return {CheckoutMeta}
     */
    getCheckoutMeta() {
        return this._cacheFactory.get('getCheckoutMeta')
            .retain((orderMeta, quoteMeta, isCartVerified, paymentAuthToken, instrumentsMeta) => ({
                ...orderMeta,
                ...(quoteMeta && quoteMeta.request),
                ...instrumentsMeta,
                isCartVerified,
                paymentAuthToken,
            }))
            .retrieve(
                this._order.getOrderMeta(),
                this._quote.getQuoteMeta(),
                this._cart.isValid(),
                this._order.getPaymentAuthToken(),
                this._instruments.getInstrumentsMeta()
            );
    }

    /**
     * @return {Order}
     */
    getOrder() {
        return this._order.getOrder();
    }

    /**
     * @return {Order}
     */
    getQuote() {
        return this._quote.getQuote();
    }

    /**
     * @return {Config}
     */
    getConfig() {
        return this._config.getConfig();
    }

    /**
     * @return {Address}
     */
    getShippingAddress() {
        return this._shippingAddress.getShippingAddress();
    }

    /**
     * @return {ShippingOptionList}
     */
    getShippingOptions() {
        return this._shippingOptions.getShippingOptions();
    }

    /**
     * @return {?ShippingOption}
     */
    getSelectedShippingOption() {
        return this._shippingOptions.getSelectedShippingOption();
    }

    /**
     * @return {Country[]}
     */
    getShippingCountries() {
        return this._shippingCountries.getShippingCountries();
    }

    /**
     * @return {Address}
     */
    getBillingAddress() {
        return this._billingAddress.getBillingAddress();
    }

    /**
     * @return {Country[]}
     */
    getBillingCountries() {
        return this._countries.getCountries();
    }

    /**
     * @return {PaymentMethod[]}
     */
    getPaymentMethods() {
        return this._paymentMethods.getPaymentMethods();
    }

    /**
     * @param {string} methodId
     * @param {string} [gatewayId]
     * @return {?PaymentMethod}
     */
    getPaymentMethod(methodId, gatewayId) {
        return this._paymentMethods.getPaymentMethod(methodId, gatewayId);
    }

    /**
     * @return {?PaymentMethod}
     */
    getSelectedPaymentMethod() {
        return this._paymentMethods.getSelectedPaymentMethod();
    }

    /**
     * @return {Cart}
     */
    getCart() {
        return this._cart.getCart();
    }

    /**
     * @return {Customer}
     */
    getCustomer() {
        return this._customer.getCustomer();
    }

    /**
     * @param {boolean} useStoreCredit
     * @return {boolean}
     */
    isPaymentDataRequired(useStoreCredit) {
        return this._order.isPaymentDataRequired(useStoreCredit);
    }

    /**
     * @param {string} methodId
     * @param {string} [gatewayId]
     * @return {boolean}
     */
    isPaymentDataSubmitted(methodId, gatewayId) {
        return this._order.isPaymentDataSubmitted(this.getPaymentMethod(methodId, gatewayId));
    }

    /**
     * @param {string} storeId
     * @param {string} shopperId
     * @return {Instrument[]}
     */
    getInstruments(storeId, shopperId) {
        return this._instruments.getInstruments(storeId, shopperId);
    }
}
