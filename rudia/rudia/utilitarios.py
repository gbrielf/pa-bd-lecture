'''Arquivo de utilitários para facilitar operações comuns.'''
from datetime import date, time, datetime
from decimal import Decimal
import locale


class Utilitarios:
    @staticmethod
    def formatar_data(data: date, formato='%d/%m/%Y') -> str: 
        '''Formata uma data para o formato especificado.'''
        return data.strftime(formato)
    
    @staticmethod
    def formatar_hora(hora, formato='%H:%M:%S') -> str:
        '''Formata uma hora para o formato especificado.'''
        if isinstance(hora, time):
            return hora.strftime(formato)
        elif isinstance(hora, datetime):
            return hora.time().strftime(formato)
        else:
            return str(hora)

    @staticmethod
    def formatar_data_hora(data_hora: datetime, formato='%d/%m/%Y %H:%M:%S') -> str:
        '''Formata uma data e hora para o formato especificado.'''
        return data_hora.strftime(formato)

    @staticmethod
    def calcular_idade(data_nascimento: date) -> int:
        '''Calcula a idade com base na data de nascimento.'''
        hoje = date.today()
        aniversario_ja_passou = (hoje.month, hoje.day) >= (data_nascimento.month, data_nascimento.day)
        return hoje.year - data_nascimento.year - (0 if aniversario_ja_passou else 1)
    
    @staticmethod
    def formatar_moeda(valor: Decimal) -> str:
        '''Formata um valor decimal como moeda em Real Brasileiro.'''
        try:
            locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
            return locale.currency(valor, grouping=True)
        except locale.Error:
            return f"R$ {valor:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
    
    @staticmethod
    def formata_moeda(valor: Decimal) -> str:
        '''Alias para formatar_moeda (mantém compatibilidade).'''
        return Utilitarios.formatar_moeda(valor)
    
    @staticmethod
    def formata_data_hora(data_hora: datetime) -> str:
        '''Alias para formatar_data_hora (mantém compatibilidade).'''
        return Utilitarios.formatar_data_hora(data_hora)
