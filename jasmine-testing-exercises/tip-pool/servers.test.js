describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should add more info on updateServerTable()', function(){
    submitServerInfo();
    updateServerTable();
    let tbl = document.querySelectorAll('#serverTable tbody tr td');
    expect(tbl.length).toEqual(2);
    expect(tbl[0].innerText).toEqual('Alice');
    expect(tbl[1].innerText).toEqual('$0.00');
  });

  afterEach(function() {
    // teardown logic
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
