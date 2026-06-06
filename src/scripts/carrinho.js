function adicionarAoCarrinho(id) {
  const produto = catalogo.find(p => p.id === id);
  if (!produto) return;
  let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  const existente = carrinho.find(i => i.id === id);
  if (existente) { existente.qtd++; }
  else { carrinho.push({ ...produto, qtd: 1 }); }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarToast(produto.nome + ' adicionado!');
}