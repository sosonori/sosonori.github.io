const defaultPath = '/projects/calculator';
let afterPath = window.location.pathname;
window.onload = () => {
    const historyLinker = document.querySelectorAll('.tab_history');
    window.history.replaceState(null, '', window.location.origin + '/projects/calculator')

    historyLinker.forEach((element) => {
        element.addEventListener('click', (event) =>{
            const dataset = event.target.dataset;
            const contentDiv = document.getElementById('pageCont');

            const type = (beforePath == defaultPath) ? 'push' : 'replace';
            historyRouerPush(dataset, type);
        })
    });
}

const historyRouerPush = (dataset, element) => {
    const state = { id: dataset.id, route: dataset.route };

    if(type == 'push') {
        window.history.pushState(state, state.route, window.location.origin + state.route);
    } else {
        window.history.replaceState(state, state.route, window.location.origin + state.route);
    }
    
    renderHTML(element, dataset.route);
}

const renderHTML = (element, route) => {
    element.innerHTML = route;
}

window.onpopstate = (history) => {
    if(history.state == null || history.state.route == afterPath)
    renderHTML(element, window.location.pathname);}