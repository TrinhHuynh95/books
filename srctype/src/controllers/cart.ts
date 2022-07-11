import providers  from '../lib/providers'
const repositories = providers.repositories

const cart = {
  async order (req: any, res: any) {
    const bookRepository = await repositories('book')
    await bookRepository.updateCart(req.body.list)

    res.status(204).send()
  }
}

export default cart
