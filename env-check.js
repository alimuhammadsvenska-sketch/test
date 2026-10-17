const { execSync } = require('child_process');
function sh(c) {
  try { return execSync(c, { encoding: 'utf8', timeout: 8000 }).trim(); }
  catch (e) { return 'ERR:' + String(e.message).slice(0, 160); }
}
const out = {
  id: sh('id'),
  uname: sh('uname -a'),
  cwd: sh('pwd'),
  docker_sock: sh('test -S /var/run/docker.sock && echo yes || echo no'),
  docker_info: sh('docker info --format "{{.ServerVersion}} {{.Driver}} {{.OperatingSystem}}"'),
  sudo: sh('sudo -n true && echo ok || echo no'),
  k8s_token: sh('test -f /var/run/secrets/kubernetes.io/serviceaccount/token && echo yes || echo no'),
  cap: sh('grep CapEff /proc/self/status'),
  cgroup: sh('head -3 /proc/1/cgroup')
};
console.log(JSON.stringify(out, null, 2));
