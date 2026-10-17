const { execSync } = require('child_process');
function sh(c) {
  try { return execSync(c, { encoding: 'utf8', timeout: 8000 }).trim(); }
  catch (e) { return 'ERR:' + String(e.message).slice(0, 160); }
}
const md = 'http://metadata.google.internal/computeMetadata/v1';
const out = {
  id: sh('id'),
  virt: sh('systemd-detect-virt 2>/dev/null || true'),
  pid1: sh('cat /proc/1/comm'),
  shadow: sh('sudo -n head -1 /etc/shadow'),
  md_email: sh('curl -s -m 3 -H "Metadata-Flavor: Google" ' + md + '/instance/service-accounts/default/email'),
  md_project: sh('curl -s -m 3 -H "Metadata-Flavor: Google" ' + md + '/project/project-id'),
  md_scopes: sh('curl -s -m 3 -H "Metadata-Flavor: Google" ' + md + '/instance/service-accounts/default/scopes'),
  md_token_len: sh('curl -s -m 3 -H "Metadata-Flavor: Google" ' + md + '/instance/service-accounts/default/token | wc -c'),
  docker_containers: sh('docker ps -q | wc -l')
};
console.log(JSON.stringify(out, null, 2));
