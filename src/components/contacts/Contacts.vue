<template>
  <main-layout>

    <v-layout class="mt-4 mx-4">

      <div class="mt-3 ml-3">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="mr-3">
        <v-text-field
          v-model="processCode"
          class="grey--text"
          color="grey"
          label="Код бизнес процесса"
        >
        </v-text-field>
      </div>

      <div class="mr-1 mt-2">

        <v-btn
          color="primary"
          small
          round
          outline
          @click="runProcess()"
          icon
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>

        <v-btn
          class="ml-4"
          color="primary"
          round
          outline
          small
          @click="dialog = true"
        >
          Добавить контакт
        </v-btn>

      </div>

    </v-layout>

    <!-- table begin -->
    <v-flex xs12 class="px-4">

      <v-data-table
        disable-initial-sort
        no-data-text="Нет элементов для отображения"
        :headers="headers"
        :items="items"
      >

        <!-- table items -->
        <template
          slot="items"
          slot-scope="td"
        >

          <td
            v-for="column in columns"
            :key="column"
          >
            {{td.item.attributesCollection.find( elem => elem.name === column) | label}}
          </td>

          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="runProcess(td.item.objectId)"
            >
              play_arrow
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="showUpdateDialog(td.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(td.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <!-- end of table items -->

      </v-data-table>

    </v-flex>
    <!-- table end -->

    <!-- dialog -->
    <v-dialog v-model="dialog" width="360">
      <v-card>

        <v-card-title class="headline" v-text="title">
        </v-card-title>

        <v-divider></v-divider>

        <div class="px-3">
          <v-text-field
            v-model="newItem.GivenName"
            label="Имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="newItem.Surname"
            label="Фамилия"
            required
          ></v-text-field>

          <v-menu :close-on-content-click="false">
            <v-text-field
              slot="activator"
              v-model="newItem.BirthDate"
              label="Дата рождения"
              @click="showDatePicker = true"
              required
              readonly
            ></v-text-field>

            <v-date-picker
              no-title
              locale="ru"
              scrollable
              v-model="newItem.BirthDate"
              min="1950-01-01"
              v-if="showDatePicker"
              @input="showDatePicker = false"
            ></v-date-picker>
          </v-menu>
        </div>


        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            color="error"
            @click="resetNewItem()"
          >
            Отмена
          </v-btn>

          <v-btn
            flat
            color="primary"
            @click="saveChanges()"
          >
            {{newItem.Id? 'Изменить' :'Добавить'}}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <!-- dialog -->
  </main-layout>
</template>

<script>
  import {mapState} from 'vuex';
  import Filters from '@/helpers/HelperFilters'

  export default {
    name: 'Contacts',

    filters: {
      split: (income = 0) => {
        return Filters.splitNumbers(income);
      },
      humanDate: (income = 0) => {
        return Filters.humanDate(income)
      },
      label: (item) => {
        if (item.type && item.type === 'Edm.DateTime') {
          return Filters.humanDate(item.value)
        }
        return item.value
      }
    },

    data: () => ({
      title: 'Список контактов',
      dialog: false,
      newItem: {
        Id: null,
        GivenName: null,
        Surname: null,
        BirthDate: null
      },
      processCode: 'icl1teamTestService',
      processParams: [
        {
          "name": "ProcessSchemaParameter1",
          "value": "testText",
          "type": "string"
        }, {
          "name": "ProcessSchemaParameter2",
          "value": "79",
          "type": "string"
        }, {
          "name": "ProcessSchemaParameter3",
          "value": "79",
          "type": "integer"
        }
      ],
      editableItem: {},
      showDatePicker: false
    }),

    computed: {
      ...mapState({
        columns: (state) => state.contacts.columns,
        items: (state) => state.contacts.contacts
      }),
      headers: function () {
        let result = [];
        this.columns.forEach((item, index, array) => {
          result.push({
            text: item,
            value: item,
            sortable: false,
          })
        });
        result.push({
          text: 'Actions',
          align: 'left',
          sortable: false,
        });
        return result
      }
    },

    beforeCreate() {
      this.$store.dispatch('loadContacts');
    },

    methods: {
      saveChanges: function () {
        let action = this.newItem.Id ? 'updateContact' : 'createContact';
        this.$store.dispatch(action, this.newItem).then(() => {
          this.resetNewItem();
        });
      },
      resetNewItem: function () {
        Object.keys(this.newItem).forEach((key) => this.newItem[key] = null);
        this.dialog = false;
      },
      showUpdateDialog: function (item) {
        item.attributesCollection.forEach((attr) => {
          if (this.newItem.hasOwnProperty(attr.name)) {
            this.newItem[attr.name] = attr.value;
          }
        });
        this.dialog = true;
      },
      deleteItem: function (item) {
        confirm('Вы уверены, что хотите удалить этот элемент?') && this.$store.dispatch('deleteContact', item.objectId);
      },
      runProcess: function (objectId = null) {
        this.$store.dispatch('runProcess', {
          objectId: objectId,
          processCode: this.processCode,
          parameters: this.processParams,
        })
      }
    },
  }
</script>
