module.exports = {
  swagger: '2.0',
  info: {
    description: 'you must use the api key `secret-key` to test the authorization filters.',
    version: '1.0.0',
    title: 'Training'
  },
  basePath: '/',
  schemes: [
    'https',
    'http'
  ],
  paths: {
    'api/book': {
      get: {
        tags: [
          'Book'
        ],
        summary: 'Finds Books',
        description: 'Can find books by author_id and category_id',
        produces: [
          'application/json'
        ],
        parameters: [],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                total: {
                  type: 'number'
                },
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Book'
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid status value'
          }
        }
      },
      post: {
        tags: [
          'Book'
        ],
        summary: 'Create Book',
        description: 'create new book',
        produces: [
          'application/json'
        ],
        parameters: [
          {
            name: 'book_title',
            in: 'query',
            type: 'string'
          },
          {
            name: 'book_summary',
            in: 'query',
            type: 'string'
          },
          {
            name: 'category_id',
            in: 'query',
            type: 'string'
          },
          {
            name: 'quantity',
            in: 'query',
            type: 'number'
          },
          {
            name: 'book_price',
            in: 'query',
            type: 'number'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                total: {
                  type: 'number'
                },
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Book'
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid status value'
          },
          403: {
            description: 'Permission'
          }
        }
      }
    },
    'api/book/{id}': {
      get: {
        tags: [
          'Book'
        ],
        summary: "Get book's detail",
        description: "Get book's detail by id",
        produces: [
          'application/json'
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              $ref: '#/definitions/Book'
            }
          },
          400: {
            description: 'Invalid status value'
          }
        }
      }
    },
    'api/cart': {
      post: {
        tags: [
          'cart'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            name: 'list',
            in: 'query',
            type: 'array',
            items: {
              _id: {
                type: 'string'
              },
              cart: {
                type: 'number'
              }
            }
          }
        ],
        responses: {
          204: {
            description: 'successful operation'
          },
          400: {
            description: 'Invalid status value'
          },
          401: {
            description: 'Permission'
          }
        }
      }
    },
    'auth/login': {
      post: {
        tags: [
          'auth'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            name: 'email',
            in: 'query',
            type: 'string'
          },
          {
            name: 'pw',
            in: 'query',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                profile: {
                  type: 'object',
                  $ref: '#/definitions/Book'
                },
                _token: {
                  type: 'string'
                },
                error: {
                  type: 'string'
                }
              }
            }
          },
          400: {
            description: 'Invalid status value'
          }
        }
      }
    },
    'auth/register': {
      post: {
        tags: [
          'auth'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            name: 'email',
            in: 'query',
            type: 'string'
          },
          {
            name: 'pw',
            in: 'query',
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                profile: {
                  type: 'object',
                  $ref: '#/definitions/Book'
                },
                _token: {
                  type: 'string'
                },
                error: {
                  type: 'string'
                }
              }
            }
          },
          400: {
            description: 'Invalid status value'
          }
        }
      }
    }
  },
  securityDefinitions: {
    secret_key: {
      type: 'apiKey',
      name: 'secret_key',
      in: 'header'
    }
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        is_admin: {
          type: 'boolean'
        },
        create_at: {
          type: 'string'
        },
        update_at: {
          type: 'string'
        }
      }
    },
    Book: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        category_id: {
          type: 'string'
        },
        author_id: {
          type: 'string'
        },
        book_title: {
          type: 'string'
        },
        book_summary: {
          type: 'string'
        },
        book_price: {
          type: 'number'
        },
        quantity: {
          type: 'number'
        },
        create_at: {
          type: 'string'
        },
        update_at: {
          type: 'string'
        },
        book_cover_photo_url: {
          type: 'string'
        },
        author: {
          type: 'object',
          $ref: '#/definitions/Author'
        },
        category: {
          type: 'object',
          $ref: '#/definitions/Category'
        }
      }
    },
    Author: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        author_name: {
          type: 'string'
        },
        author_bio: {
          type: 'string'
        },
        create_at: {
          type: 'date'
        },
        update_at: {
          type: 'date'
        }
      }
    },
    Category: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        category_name: {
          type: 'string'
        },
        category_desc: {
          type: 'string'
        },
        create_at: {
          type: 'string'
        },
        update_at: {
          type: 'string'
        }
      }
    }
  },
  security: [
    {
      secret_key: []
    }
  ]
}
