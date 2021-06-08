import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';
import helloWorld from './hello-world';
import example from './example';
import auth from './auth';
import master from './master';
import merchant from './merchant';
import product from './product';
import cart from './cart';
import transaction from './transaction';
import bank from './bank';
import wallet from './wallet';

const routeV2 = function routeV2(
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  donePlugin: HookHandlerDoneFunction,
): void {
  instance.register(helloWorld);
  instance.register(example, { prefix: '/example' });
  instance.register(auth, { prefix: '/auth' });
  instance.register(master, { prefix: '/masters' });
  instance.register(merchant, { prefix: '/merchants' });
  instance.register(product, { prefix: '/products' });
  instance.register(cart, { prefix: '/carts' });
  instance.register(transaction, { prefix: '/transactions' });
  instance.register(bank, { prefix: '/banks' });
  instance.register(wallet, { prefix: '/wallets' });

  donePlugin();
};

export default routeV2;
