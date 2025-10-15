'''Arquivo de utilitários para facilitar operações comuns.'''"""

from datetime import date, time, datetimeMódulo de utilitários para formatação e cálculos diversos

from decimal import Decimal"""

import localefrom datetime import date, datetime, time

from decimal import Decimal

from typing import Union

class Utilitarios:

    @staticmethod

    def formatar_data(data: date, formato='%d/%m/%Y') -> str: class Utilitarios:

        '''Formata uma data para o formato especificado.'''    """Classe com métodos utilitários para formatação de dados"""

        return data.strftime(formato)    

        @staticmethod

    @staticmethod    def calcular_idade(data_nascimento: date) -> int:

    def formatar_hora(hora, formato='%H:%M:%S') -> str:        """

        '''Formata uma hora para o formato especificado.'''        Calcula a idade baseada na data de nascimento

        if isinstance(hora, time):        

            return hora.strftime(formato)        Args:

        elif isinstance(hora, datetime):            data_nascimento: Data de nascimento

            return hora.time().strftime(formato)            

        else:        Returns:

            return str(hora)            int: Idade em anos

        """

    @staticmethod        hoje = date.today()

    def formatar_data_hora(data_hora: datetime, formato='%d/%m/%Y %H:%M:%S') -> str:        idade = hoje.year - data_nascimento.year

        '''Formata uma data e hora para o formato especificado.'''        

        return data_hora.strftime(formato)        # Verifica se ainda não fez aniversário neste ano

        if hoje.month < data_nascimento.month or \

    @staticmethod           (hoje.month == data_nascimento.month and hoje.day < data_nascimento.day):

    def calcular_idade(data_nascimento: date) -> int:            idade -= 1

        '''Calcula a idade com base na data de nascimento.'''            

        hoje = date.today()        return idade

        aniversario_ja_passou = (hoje.month, hoje.day) >= (data_nascimento.month, data_nascimento.day)    

    @staticmethod

        return hoje.year - data_nascimento.year - (0 if aniversario_ja_passou else 1)    def formatar_data(data: Union[date, datetime], formato: str = '%d/%m/%Y') -> str:

            """

    @staticmethod        Formata uma data para string

    def formatar_moeda(valor: Decimal) -> str:        

        '''Formata um valor decimal como moeda em Real Brasileiro.'''        Args:

        try:            data: Data para formatar

            # Tenta configurar locale brasileiro            formato: Formato da data (padrão: '%d/%m/%Y')

            locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')            

            return locale.currency(valor, grouping=True)        Returns:

        except locale.Error:            str: Data formatada

            # Se não conseguir configurar o locale, usa formatação manual        """

            return f"R$ {valor:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')        if data:

                return data.strftime(formato)

    @staticmethod        return "N/A"

    def formata_moeda(valor: Decimal) -> str:    

        '''Alias para formatar_moeda (mantém compatibilidade).'''    @staticmethod

        return Utilitarios.formatar_moeda(valor)    def formatar_data_hora(data_hora: datetime, formato: str = '%d/%m/%Y %H:%M:%S') -> str:

            """

    @staticmethod        Formata uma data/hora para string

    def formata_data_hora(data_hora: datetime) -> str:        

        '''Alias para formatar_data_hora (mantém compatibilidade).'''        Args:

        return Utilitarios.formatar_data_hora(data_hora)            data_hora: Data/hora para formatar
            formato: Formato da data/hora (padrão: '%d/%m/%Y %H:%M:%S')
            
        Returns:
            str: Data/hora formatada
        """
        if data_hora:
            return data_hora.strftime(formato)
        return "N/A"
    
    @staticmethod
    def formatar_hora(hora, formato: str = '%H:%M') -> str:
        """
        Formata uma hora para string
        
        Args:
            hora: Hora para formatar
            formato: Formato da hora (padrão: '%H:%M')
            
        Returns:
            str: Hora formatada
        """
        if hora:
            return hora.strftime(formato)
        return "N/A"
    
    @staticmethod
    def formatar_moeda(valor: Union[Decimal, float], simbolo: str = 'R$') -> str:
        """
        Formata um valor monetário
        
        Args:
            valor: Valor para formatar
            simbolo: Símbolo da moeda (padrão: 'R$')
            
        Returns:
            str: Valor formatado como moeda
        """
        if valor is not None:
            return f"{simbolo} {valor:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        return f"{simbolo} 0,00"
    
    @staticmethod
    def formata_moeda(valor: Union[Decimal, float], simbolo: str = 'R$') -> str:
        """
        Alias para formatar_moeda (compatibilidade com código existente)
        
        Args:
            valor: Valor para formatar
            simbolo: Símbolo da moeda (padrão: 'R$')
            
        Returns:
            str: Valor formatado como moeda
        """
        return Utilitarios.formatar_moeda(valor, simbolo)
    
    @staticmethod
    def formata_data_hora(data_hora: datetime, formato: str = '%d/%m/%Y %H:%M:%S') -> str:
        """
        Alias para formatar_data_hora (compatibilidade com código existente)
        
        Args:
            data_hora: Data/hora para formatar
            formato: Formato da data/hora (padrão: '%d/%m/%Y %H:%M:%S')
            
        Returns:
            str: Data/hora formatada
        """
        return Utilitarios.formatar_data_hora(data_hora, formato)