const onRedirectToUserInfoPage = (args) => {
	console.log("---on redirect to user info page---", args);

	actions.find(action => action.name === args.callback)();
}

const onGetTextNodeAfterMounting = ({ target }) => {
	const node = document.getElementById(target.id);
	console.log("---on get text node after mounting---", node.innerText);
}

const userInfoPageCallback = () => {
	console.log("---user info page callback---");
}

const onRunSideEffectOnEveryRerender = (args) => {
	console.log("---run side effect on every rerender ---", args);
}

export const actions = [
	onGetTextNodeAfterMounting,
	onRedirectToUserInfoPage,
	onRunSideEffectOnEveryRerender,
	userInfoPageCallback,
];
