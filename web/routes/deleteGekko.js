const cache = require('../state/cache');
const gekkoManager = cache.get('gekkos');

// Deletes a gekko
// requires a post body with an id
module.exports = (ctx) => {

  let id = ctx.request.body.id;

  if(!id) {
    ctx.body = { status: 'not ok' }
    return;
  }

  try {
    gekkoManager.delete(id);
  } catch(e) {
    ctx.body = { status: e.message }
  }

  ctx.body = { status: 'ok' };
}
