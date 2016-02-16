import React from 'react';
import { render } from 'react-dom';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import * as localStore from 'store';
import Root from './containers/Root';

if (typeof window !== 'undefined') {

    // default locale
    let locale = 'en-US';

    // localStorage
    if (localStore.get('locale')) {
        locale = localStore.get('locale');
    } else {
        localStore.set('locale', locale);
    }

    // redux store
    let initialState = {
        currentLocale: locale
    };

    // i18next options
    const i18nextOptions = {
        lng: locale,
        fallbackLng: 'en-US',
        load: ['en-US', 'zh-HK'],
        whitelist: ['en-US', 'zh-HK'],
        ns: 'translation',
        defaultNS: 'translation',
        backend: {
            crossDomain: false,
            loadPath: '/assets/locales/{{lng}}/{{ns}}.json'
        },
        preload: [locale]
    };

    // bootstrap React on i18next callback
    i18next
        .use(XHR)
        .init(i18nextOptions, (err, t) => {
            render(
                <Root store={store}/>,
                document.getElementById('app')
            );
        }
    );

}
