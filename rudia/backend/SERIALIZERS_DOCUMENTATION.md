# Exemplo de uso dos Serializers criados

"""
Os serializers criados fornecem uma interface completa para os modelos da aplicação Rudia.
Eles incluem:

## Serializers de Usuários:
- UsuarioSerializer: Usuário base com propriedades de identificação de tipo
- RudieroSerializer: Usuário turista com data de nascimento e gênero
- ParceiroSerializer: Usuário prestador de serviço com CNPJ e dados de negócio
- ModeradorSerializer: Usuário moderador com dados pessoais
- AdministradorSerializer: Usuário administrador do sistema

## Serializers de Localização:
- EstadoSerializer: Estados brasileiros com formatação
- CidadeSerializer: Cidades com referência ao estado
- EnderecoSerializer: Endereços completos com formatação de CEP

## Serializers de Categorização:
- CategoriaSerializer: Categorias de serviços
- TagSerializer: Tags vinculadas às categorias

## Serializers de Serviços:
- ServicoSerializer: Serviços oferecidos pelos parceiros
- HorarioFuncionamentoSerializer: Horários de funcionamento dos serviços
- ImagemServicoSerializer: Imagens dos serviços

## Serializers de Roteiros:
- RoteiroSerializer: Roteiros de viagem criados pelos rudieros
- ImagemCidadeSerializer: Imagens das cidades

## Serializers de Análise:
- AnalisePropostaParceriaSerializer: Análise de propostas de parceria
- AnalisePropostaServicoSerializer: Análise de propostas de serviços

## Características dos Serializers:

1. **Propriedades Calculadas**: Todos incluem propriedades calculadas dos modelos (como formatações)
2. **Campos Write-Only**: Campos como 'password' são write-only para segurança
3. **Referências Otimizadas**: Uso de serializers básicos para evitar referências circulares
4. **Validação Automática**: Validação baseada nos modelos Django
5. **Relacionamentos**: Suporte completo a ForeignKey e ManyToMany

## Exemplo de Uso:

```python
# Criar um novo usuário Rudiero
from backend.serializers import RudieroSerializer

data = {
    'username': 'joao123',
    'email': 'joao@email.com',
    'nome': 'João Silva',
    'password': 'minhasenha123',
    'data_nascimento': '1990-05-15',
    'genero': 'M'
}

serializer = RudieroSerializer(data=data)
if serializer.is_valid():
    rudiero = serializer.save()
    print(f"Rudiero criado: {rudiero}")
else:
    print("Erros:", serializer.errors)

# Serializar um serviço existente
from backend.serializers import ServicoSerializer
from backend.models import Servico

servico = Servico.objects.get(id=1)
serializer = ServicoSerializer(servico)
print(serializer.data)  # Retorna dados formatados incluindo propriedades calculadas
```

## Benefícios:

1. **API REST Completa**: Pronto para uso em views DRF
2. **Formatação Automática**: Campos formatados (telefone, CNPJ, preços, datas)
3. **Segurança**: Senhas protegidas, campos read-only apropriados
4. **Flexibilidade**: Diferentes níveis de serialização (básico vs completo)
5. **Performance**: Evita consultas desnecessárias com serializers otimizados
"""