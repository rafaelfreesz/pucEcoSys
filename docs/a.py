import random
import math
def traduz_estado(estado):
    if estado == "SP":
        return "São Paulo"
    elif estado == "MG":
        return "Minas Gerais"
    elif estado == "RS":
        return "Rio Grande do Sul"
    else:
        return "Bahia"
    
#Gerando dados
#Produtos
file_in = open("input/produtos.csv",'r', encoding="utf8")
produtos = []
while line := file_in.readline():
    linha = line.split('\n')[0]
    linha = linha.split(";")
    produtos.append([linha[0],linha[0],linha[1],random.randint(0,1000)])

#Fornecedores
file_in = open("input/sobrenomes.csv",'r', encoding="utf8")
sobrenomes = []
while line := file_in.readline():
    linha = line.split('\n')[0]
    linha = linha.split(";")
    sobrenomes.append(linha[0])

file_in.close()

file_in = open("input/fornecedores.csv",'r', encoding="utf8")
fornecedores = []
while line := file_in.readline():
    linha = line.split('\n')[0]
    linha = linha.split(";")
    fornecedores.append([linha[0],linha[1],f"{random.choice(sobrenomes)} & {random.choice(sobrenomes)} LTDA"])

file_in.close()

#Endereços
file_in = open("input/enderecos.csv",'r', encoding="utf8")
enderecos = []
i = 1
while line := file_in.readline():
    linha = line.split('\n')[0]
    linha = linha.split(";")
    enderecos.append([linha[0],linha[1],random.choice(list(range(1,1001))),linha[5],linha[2],linha[3],linha[4],i])
    i+=1
file_in.close()

#Contatos
contatos = []
i_fornecedor = 1
for i, fornecedor in enumerate(fornecedores):
    qtd_contatos = random.choice(range(1,10))
    for i in range(qtd_contatos):
        tipo = random.choice(['F','E'])
        valor = ""
        if tipo == 'E':
            valor = f'{"".join(fornecedor[1].split(" ")).lower()}_{i}@gmail.com'
        else:
            valor = "1111111111"
        contatos.append([tipo,valor,i+1])
    i_fornecedor+=1
file_in.close()

#Entradas
entradas = []
datas_recentes = [f'2025-02-0{k}' for k in range(1,10)] + [f'2025-02-{k}' for k in range(10,19)]
entrada_por_data = round(len(fornecedores)/len(datas_recentes))
i_data = 0
for i, fornecedor in enumerate(fornecedores):
    if i%entrada_por_data == 0:
        i_data+=1
    entradas.append([datas_recentes[i_data],random.randint(100000,999999),i+1])

#Item Entrada
items_entrada = []
produto_por_entrada = round(len(produtos)/len(entradas))
i_produto = 0
print(len(produtos),len(entradas),produto_por_entrada)
for i, fornecedor in enumerate(entradas):
    for j in range(produto_por_entrada):
        items_entrada.append([i_produto+1,i+1,produtos[i_produto][3],float(produtos[i_produto][2])*0.7])
        i_produto+=1
    if i_produto + produto_por_entrada >= len(produtos):
        while i_produto < len(produtos):
            items_entrada.append([i_produto+1,i+1,produtos[i_produto][3],float(produtos[i_produto][2])*0.7])
            i_produto+=1


#Vendas
vendas = []
estoque = [produto[3] for produto in produtos]
qtd_vendas = 1000
vendas_por_dia = round(qtd_vendas/len(datas_recentes))
i_data = 0
for i in range(len(datas_recentes)):
    hora = 8
    minuto = 0
    data_hr_venda = f"{datas_recentes[i_data]}T0{hora}:0{minuto}:00.000Z"
    for j in range(vendas_por_dia):
        vendas.append([data_hr_venda,random.choice(['d','p','cc','cd'])])
        minuto += random.choice([8,10,2,4,5,7,12,15,18,16,14,20])
        if minuto > 60:
            hora+=1
            minuto-=60

        str_hora = f'0{hora}' if hora < 10 else str(hora)
        str_minuto = f'0{minuto}' if minuto < 10 else str(minuto)
        data_hr_venda = f"{datas_recentes[i_data]}T{str_hora}:{str_minuto}:00.000Z"
        
    i_data+=1

#Items venda
items_venda = []
total_produtos = sum([produto[3] for produto in produtos])
produtos_por_venda = round(total_produtos/len(vendas))
print(total_produtos,produtos_por_venda)
for i, venda in enumerate(vendas):
    qtd_items = random.randint(1,20)
    for i in range(qtd_items):
        qtd_item = 0
        item = -1
        while qtd_item == 0:
            item = random.choice(produtos)
            qtd_item = random.randint(min(1,item[3]),min(20,item[3]))
        item[3] = item[3] - qtd_item
        items_venda.append([produtos.index(item)+1,vendas.index(venda)+1,qtd_item,float(item[2])])

#Imprimindo
#Produtos
file_out = open("output/produtos.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/produtos.csv",'a', encoding="utf8")
for produto in produtos:
    file_out.write(f"('{produto[0]}','{produto[1]}',{produto[2]},{produto[3]}),\n")


file_out.close()

#Fornecedores
file_out = open("output/fornecedores.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/fornecedores.csv",'a', encoding="utf8")
for fornecedor in fornecedores:
    file_out.write(f"('{fornecedor[0]}','{fornecedor[1]}','{fornecedor[2]}'),\n")


file_out.close()

#Endereços
file_out = open("output/enderecos.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/enderecos.csv",'a', encoding="utf8")
for endereco in enderecos:
    file_out.write(f"('{endereco[0]}','{endereco[1]}','{endereco[2]}','{endereco[3]}','{endereco[4]}','{endereco[5]}','{traduz_estado(endereco[6])}',{endereco[7]}),\n")


file_out.close()

#Contatos
file_out = open("output/contatos.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/contatos.csv",'a', encoding="utf8")
for contato in contatos:
    file_out.write(f"('{contato[0]}','{contato[1]}',{contato[2]}),\n")


file_out.close()

#Entradas
file_out = open("output/entradas.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/entradas.csv",'a', encoding="utf8")
for entrada in entradas:
    file_out.write(f"('{entrada[0]}','{entrada[1]}',{entrada[2]}),\n")


file_out.close()

#Items Entradas
file_out = open("output/items_entrada.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/items_entrada.csv",'a', encoding="utf8")
for item_entrada in items_entrada:
    file_out.write(f"({item_entrada[0]},{item_entrada[1]},{item_entrada[2]},{item_entrada[3]}),\n")


file_out.close()

#Vendas
file_out = open("output/vendas.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/vendas.csv",'a', encoding="utf8")
for venda in vendas:
    file_out.write(f"('{venda[0]}','{venda[1]}'),\n")

#Items Vendas
file_out = open("output/items_vendas.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/items_vendas.csv",'a', encoding="utf8")
for item_venda in items_venda:
    file_out.write(f"({item_venda[0]},{item_venda[1]},{item_venda[2]},{item_venda[3]}),\n")


file_out.close()