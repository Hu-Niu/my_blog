/**
 * 将mysql的数据类型 映射为 js数据类型
 * key<mysql type>
 * value<js type>
 */
const typeMapper = new Map([
    ['bigint','Bigint'],

    ['date','Date'],
    ['datetime','Date'],
    ['time','Date'],
    ['timestamp','Date'],

    ['double','Number'],
    ['float','Number'],
    ['int','Number'],
    ['tinyint','Number'],

    ['longtext','String'],
    ['tinytext','String'],
    ['text','String'],
    ['char','String'],
    ['varchar','String'],

])

module.exports = {
    typeMapper
}


