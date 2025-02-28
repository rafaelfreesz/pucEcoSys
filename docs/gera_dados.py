import random
import math
import utils as ut

datas_recentes = ut.gera_datas()
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
    qtd_contatos = random.choice(range(1,5))
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
for i, fornecedor in enumerate(entradas):
    for j in range(produto_por_entrada):
        items_entrada.append([i_produto+1,i+1,produtos[i_produto][3],round(float(produtos[i_produto][2])*0.7,2)])
        i_produto+=1
    if i_produto + produto_por_entrada >= len(produtos):
        while i_produto < len(produtos):
            items_entrada.append([i_produto+1,i+1,produtos[i_produto][3],round(float(produtos[i_produto][2])*0.7,2)])
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
        if minuto >= 60:
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
for i, venda in enumerate(vendas):
    qtd_items = random.randint(1,20)
    for i in range(qtd_items):
        qtd_item = 0
        item = -1
        while qtd_item == 0:
            item = random.choice(produtos)
            qtd_item = random.randint(min(1,item[3]),min(20,item[3]))
        item[3] = item[3] - qtd_item
        items_venda.append([produtos.index(item)+1,vendas.index(venda)+1,qtd_item,round(float(item[2]),2)])

#Imprimindo
#Produtos
file_out = open("output/tb_produto.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_produto.csv",'a', encoding="utf8")
for produto in produtos:
    file_out.write(f"('{produto[0]}','{produto[1]}',{produto[2]},{produto[3]})\n")


file_out.close()

#Fornecedores
file_out = open("output/tb_fornecedor.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_fornecedor.csv",'a', encoding="utf8")
for fornecedor in fornecedores:
    file_out.write(f"('{fornecedor[0]}','{fornecedor[1]}','{fornecedor[2]}')\n")


file_out.close()

#Endereços
file_out = open("output/tb_endereco.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_endereco.csv",'a', encoding="utf8")
for endereco in enderecos:
    file_out.write(f"('{endereco[0]}','{endereco[1]}','{endereco[2]}','{endereco[3]}','{endereco[4]}','{endereco[5]}','{ut.traduz_estado(endereco[6])}',{endereco[7]})\n")


file_out.close()

#Contatos
file_out = open("output/tb_contato.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_contato.csv",'a', encoding="utf8")
for contato in contatos:
    file_out.write(f"('{contato[0]}','{contato[1]}',{contato[2]})\n")


file_out.close()

#Entradas
file_out = open("output/tb_entrada.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_entrada.csv",'a', encoding="utf8")
for entrada in entradas:
    file_out.write(f"('{entrada[0]}','{entrada[1]}',{entrada[2]})\n")


file_out.close()

#Items Entradas
file_out = open("output/tb_item_entrada.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_item_entrada.csv",'a', encoding="utf8")
for item_entrada in items_entrada:
    file_out.write(f"({item_entrada[0]},{item_entrada[1]},{item_entrada[2]},{item_entrada[3]})\n")


file_out.close()

#Vendas
file_out = open("output/tb_venda.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_venda.csv",'a', encoding="utf8")
for venda in vendas:
    file_out.write(f"('{venda[0]}','{venda[1]}')\n")

#Items Vendas
file_out = open("output/tb_item_venda.csv",'w', encoding="utf8")
file_out.close()

file_out = open("output/tb_item_venda.csv",'a', encoding="utf8")
for item_venda in items_venda:
    file_out.write(f"({item_venda[0]},{item_venda[1]},{item_venda[2]},{item_venda[3]})\n")


file_out.close()

#Imprimindo dump

arquivos = [ "tb_contato.csv", "tb_endereco.csv", "tb_entrada.csv", "tb_fornecedor.csv", "tb_item_entrada.csv", "tb_item_venda.csv", "tb_produto.csv", "tb_venda.csv"]
arquivos_dados = dict()

#Importando dados dos arquivos impressos
for arquivo in arquivos:
    file_in = open(f"output/{arquivo}", encoding="utf8")
    arquivos_dados[arquivo] = [line.strip().split("\n")[0] for line in file_in.readlines()]

    file_in.close()

file_out = open("output/dbBuild.sql",'w', encoding="utf8")
file_out.close()

file_out = open("../ecosys-back/bin/sql/dbBuild.sql",'a', encoding="utf8")

file_in = open("input/modelo.sql",'r', encoding="utf8")

lines_in = [line.strip().split("\n")[0] for line in file_in.readlines()]

for line_in in lines_in:
    file_out.write(f"{line_in}\n")

    if "INSERT" in line_in:
        for arquivo in arquivos:
            no_tabela = arquivo.split(".")[0]
            if no_tabela in line_in:
                for registro in arquivos_dados[arquivo]:
                    if id(registro) != id(arquivos_dados[arquivo][-1]):
                        file_out.write(f"\t{registro},\n")
                    else:
                        file_out.write(f"\t{registro};")

file_in.close()
file_out.close()