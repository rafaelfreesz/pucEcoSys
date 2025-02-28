import datetime as dt

def gera_datas():
    datas = []

    for i in range(1,18):
        hoje = dt.datetime.today()
        dias_atras = dt.timedelta(days = 18-i)
        hoje = hoje - dias_atras
        datas.append(str(hoje).strip().split(" ")[0])
    
    hoje = dt.datetime.today()
    datas.append(str(hoje).strip().split(" ")[0])
    return datas

def traduz_estado(estado):
    if estado == "SP":
        return "São Paulo"
    elif estado == "MG":
        return "Minas Gerais"
    elif estado == "RS":
        return "Rio Grande do Sul"
    else:
        return "Bahia"

# def ler_dump