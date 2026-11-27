import swaggerUi from 'swagger-ui-express';
export const swaggerDocs={
  "openapi": "3.0.3",
  "info": {
    "title": "Coperex demo",
    "version": "2.0.0"
  },
  "servers": [
    {
      "url": "http://127.0.0.1:3002/coperex/v1"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Iniciar sesión demo",
        "responses": {
          "200": {
            "description": "Correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Token inválido"
          },
          "403": {
            "description": "Sin permiso administrativo"
          },
          "409": {
            "description": "Nombre o email duplicado"
          }
        },
        "security": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "password"
                ],
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/company/": {
      "get": {
        "summary": "Listar empresas filtradas (admin)",
        "responses": {
          "200": {
            "description": "Correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Token inválido"
          },
          "403": {
            "description": "Sin permiso administrativo"
          },
          "409": {
            "description": "Nombre o email duplicado"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "category",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "impactLevel",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "minTrayectory",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "maxTrayectory",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "sort",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "limite",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "desde",
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/company/addCompany": {
      "post": {
        "summary": "Crear empresa (admin)",
        "responses": {
          "200": {
            "description": "Correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Token inválido"
          },
          "403": {
            "description": "Sin permiso administrativo"
          },
          "409": {
            "description": "Nombre o email duplicado"
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "nameCompany": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "foundationYear": {
                    "type": "integer",
                    "minimum": 1600
                  },
                  "impactLevel": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/company/editCompany/{idCompany}": {
      "put": {
        "summary": "Actualizar empresa (admin)",
        "responses": {
          "200": {
            "description": "Correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Token inválido"
          },
          "403": {
            "description": "Sin permiso administrativo"
          },
          "409": {
            "description": "Nombre o email duplicado"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "idCompany",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "nameCompany": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "foundationYear": {
                    "type": "integer",
                    "minimum": 1600
                  },
                  "impactLevel": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/company/report": {
      "get": {
        "summary": "Descargar la misma página filtrada como Excel (admin)",
        "responses": {
          "200": {
            "description": "Correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Token inválido"
          },
          "403": {
            "description": "Sin permiso administrativo"
          },
          "409": {
            "description": "Nombre o email duplicado"
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "category",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "impactLevel",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "minTrayectory",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "maxTrayectory",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "sort",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "limite",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "desde",
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    }
  }
};
export {swaggerUi};
