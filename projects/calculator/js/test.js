window.onload = () => {
    const historyLinker = document.querySelectorAll('.tab_history');

    historyLinker.forEach((element) => {
        element.addEventListener('click', (event) =>{
            const dataset = event.target.dataset;
            const contentDiv = document.getElementById('pageCont');
            historyRouerPush(dataset, contentDiv);
        })
    });
}

const historyRouerPush = (dataset, element) => {
    const state = { id: dataset.id, route: dataset.route };
    window.history.pushState(state, state.route, window.location.origin + state.route);
    renderHTML(element, dataset.route);
}

const renderHTML = (element, route) => {
    element.innerHTML = route;
}

window.onpopstate = () => renderHTML(element, window.location.pathname);