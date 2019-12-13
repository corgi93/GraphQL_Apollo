// js가 아닌 ts로 구현함

const { DataStore } = require('notarealdb');

const store = new DataStore('../data')

module.exports = {
    students : store.collection('students'),
    univ : store.collection('univ')
};
