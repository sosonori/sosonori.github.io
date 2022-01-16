//import * as React from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, BackHandler, Alert, DatePickerAndroid } from 'react-native';
import Constants from 'expo-constants';
import { render } from 'react-dom';

export default function App() {

	let isCanGoBack = false;
	const INJECTED_CODE = `
(function() {
	window.onload = () => {
		$('.routeLink').each((index, element) => {
			$(element).on('click', (event) => {
				const data = $(event.target).data();
				historyRouerPush(data);
			});
		});
	};

	const historyRouerPush = (state) => {
		window.history.pushState(state, state.route, window.location.origin + state.route);
		const component = $('.componentView[data-component="' + state.route + '"]');
		window.ReactNativeWebView.postMessage('aaa');
		//console.log(window.history);
		renderHTML(component, state.route);
	};

	const renderHTML = (component, route) => {
		$('.componentView[aria-hidden="false"]').attr('aria-hidden', true);
		component.attr('aria-hidden', false);
		//component.html(route);
	};

	window.onpopstate = (history) => {
		//window.history.replaceState(history, history.route, window.location.origin + history.route);
		window.ReactNativeWebView.postMessage(window.history);
		if (history.state == null || history.state == '/projects/calculator') {
			
			//if (confirm('종료하시겠습니까?')) {
			//	window.ReactNativeWebView.postMessage('exitApp');
			//} else {
			//	history.state = null;
			//	window.ReactNativeWebView.postMessage('navigationStateChange');
			//}
		} else {
			if (history.state == null || history.state == '/projects/calculator') {

			} else {
				//window.ReactNativeWebView.postMessage(window.history);
				const component = $('.componentView[data-component="' + history.state.route + '"]');
				renderHTML(component, history.state.route);
			}
			
		}
	};
})();
`;

	const ref = useRef();
	const [navState, setNavState] = useState();

	useEffect(() => {
		const onPress = () => {
			console.log('64 : ',navState.canGoBack);

			if (navState.url == 'http://sosonori.woobi.co.kr/projects/calculator/' || navState.url == 'http://sosonori.woobi.co.kr/projects/calculator') {

					Alert.alert(
						"확인",
						"서비스를 종료하시겠습니까?",
						[
						  // The "Yes" button
						  {
							text: "아니요",
							
						  },
						  // The "No" button
						  // Does nothing but dismiss the dialog when tapped
						  {
							text: "예",
							onPress: () => {
								BackHandler.exitApp();  // 앱 종료
							},
						  },
						]
					  );
				
			}

			if(navState.canGoBack && navState.url != 'http://sosonori.woobi.co.kr/projects/calculator/') {
				console.log('goBack')
				ref.current.goBack();
			}

			

			console.log(navState);
			return true;
			if (navState.url == 'http://sosonori.woobi.co.kr/projects/calculator') {

					Alert.alert(
						"확인",
						"서비스를 종료하시겠습니까?",
						[
						  // The "Yes" button
						  {
							text: "아니요",
							
						  },
						  // The "No" button
						  // Does nothing but dismiss the dialog when tapped
						  {
							text: "예",
							onPress: () => {
								BackHandler.exitApp();  // 앱 종료
							},
						  },
						]
					  );
				
			} else {
				ref.current.goBack();
				return true;
			}
			/*if (navState.canGoBack == true) {
				// 뒤로 갈 수 있는 상태라면 이전 웹페이지로 이동한다
				console.log('navigationStateChange');
				ref.current.goBack();
				return true;
			}*/
			return true;
			/*if (navState.canGoBack == true) {
				// 뒤로 갈 수 있는 상태라면 이전 웹페이지로 이동한다
				console.log('navigationStateChange');
				ref.current.goBack();
				return true;

			} else if(navState.canGoBack == false) {
				console.log('exitApp');
				// 뒤로 갈 수 없는 상태라면
				// 다른 원하는 행동을 하면 된다
				//BackHandler.exitApp();  // 앱 종료
				return true;
			} */
		};

		// 안드로이드 백버튼이 눌렸을 때 이벤트 리스너를 등록한다.
		BackHandler.addEventListener('hardwareBackPress', onPress);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', onPress);
		};
	}, [navState]);

	return (
		<WebView
			ref={ref}
			onLoadStart={() => ref.current.injectJavaScript(INJECTED_CODE)}
			onNavigationStateChange={setNavState}
			onMessage={({ nativeEvent }) => {
				//console.log('line: 120 _________________________________________setNavState\n',nativeEvent);
				console.log('128 : ',nativeEvent.canGoBack);
				setNavState(nativeEvent);
			}}
			source={{ uri: 'http://sosonori.woobi.co.kr/projects/calculator/' }}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
});
